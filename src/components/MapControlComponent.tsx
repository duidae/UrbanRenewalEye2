import React from "react";
import {observer} from "mobx-react";
import {Divider, IconButton, InputBase, Paper, Tooltip} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import LayersIcon from "@material-ui/icons/Layers";
import SearchIcon from "@material-ui/icons/Search";
import StreetviewIcon from "@material-ui/icons/Streetview";
import CenterFocusStrongIcon from "@material-ui/icons/CenterFocusStrong";

import {AppStore} from "stores";

const styles = theme => ({
    root: {
        margin: 10,
        display: "flex",
        alignItems: "center",
        width: 450,
        height: 40
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1
    },
    iconButton: {
        padding: 10
    },
    divider: {
        height: 28,
        margin: 4
    }
});

@observer
class MapControl extends React.Component<any, any> {
    private handleLocateMeClick = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position: GeolocationPosition) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    if (this.props.map) {
                        this.props.map.setCenter(pos);
                        const infoWindow = new google.maps.InfoWindow({position: pos, content: "我在這！"});
                        infoWindow?.open({map: this.props.map, shouldFocus: false});
                    }
                },
                () => {
                    console.log("Error: The Geolocation service failed.");
                }
            );
        } else {
            // Browser doesn't support Geolocation
            console.log("Error: Your browser doesn't support geolocation.");
        }
    };

    private handleSideBySideModeClick = () => {
        AppStore.Instance.setSideBySideMode();
    };

    public render() {
        const classes = this.props.classes;
        return (
            <Paper component="form" className={classes.root}>
                <Tooltip title="都更圖層">
                    <IconButton className={classes.iconButton} aria-label="都更圖層">
                        <LayersIcon />
                    </IconButton>
                </Tooltip>
                <InputBase className={classes.input} placeholder="搜尋地址" inputProps={{"aria-label": "search google maps"}} />
                <IconButton className={classes.iconButton} aria-label="search">
                    <SearchIcon />
                </IconButton>
                <Divider className={classes.divider} orientation="vertical" />
                <Tooltip title="我在哪？">
                    <IconButton onClick={this.handleLocateMeClick} color="primary" className={classes.iconButton} aria-label="directions">
                        <CenterFocusStrongIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="街景模式">
                    <IconButton onClick={this.handleSideBySideModeClick} color="primary" className={classes.iconButton} aria-label="directions">
                        <StreetviewIcon />
                    </IconButton>
                </Tooltip>
            </Paper>
        );
    }
}

export const MapControlComponent = withStyles(styles as {})(MapControl);
