import React from "react";
import {observer} from "mobx-react";
import {Checkbox, Divider, FormControlLabel, Link, IconButton, Paper, Tooltip, Typography} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import CenterFocusStrongIcon from "@material-ui/icons/CenterFocusStrong";

import {AppStore} from "stores";
import {HOME, TAIPEI_DISTRICTS} from "models";

const styles = theme => ({
    root: {
        display: "flex",
        flexDirection: "row",
        margin: 10
    },
    logo: {
        maxWidth: 30,
        maxHeight: 30,
        marginRight: theme.spacing(1)
    },
    title: {
        // TODO: change background to theme color
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        padding: "0 5px 0 5px",
        boxShadow: "0 0 10px white",
        borderRadius: "3px",
        height: 40,
        display: "flex",
        alignItems: "center",
        marginRight: theme.spacing(3),
        "&:hover": {
            textDecoration: "none"
        }
    },
    control: {
        display: "flex",
        alignItems: "center",
        width: 450,
        height: 40
    },
    input: {
        flex: 1,
        fontSize: 16,
        border: "none",
        "&:focus": {
            outline: "none"
        }
    },
    iconButton: {
        padding: 10
    },
    toggleButton: {
        border: "none",
        height: 40
    },
    divider: {
        height: 28,
        margin: 4
    }
});

@observer
class MapControl extends React.Component<any, any> {
    private handleMenuClick = () => {};

    public render() {
        const classes = this.props.classes;

        const selectAllCheckbox = (
            <FormControlLabel
                label={"全選"}
                control={
                    <Checkbox
                        checked={AppStore.Instance.isSelectingAllDistricts}
                        indeterminate={AppStore.Instance.isSelectingIndeterminateDistricts}
                        onChange={() => AppStore.Instance.selectAllDistricts()}
                    />
                }
            />
        );

        const districtCheckboxes = TAIPEI_DISTRICTS.map(district => {
            return (
                <FormControlLabel
                    key={district}
                    label={district}
                    control={
                        <Checkbox
                            checked={AppStore.Instance.selectedDistricts.get(district)}
                            onChange={() => AppStore.Instance.selectDistrict(district)}
                            name={district}
                        />
                    }
                />
            );
        });

        return (
            <div className={classes.root}>
                <Tooltip title="首頁">
                    <Link className={classes.title} color="inherit" href={HOME}>
                        <img className={classes.logo} src="logo.png" alt="都市更新天眼通" />
                        <Typography color="primary" variant="h6" noWrap>
                            都市更新天眼通
                        </Typography>
                    </Link>
                </Tooltip>
                <Paper component="form" className={classes.control}>
                    <Tooltip title="">
                        <IconButton color="primary" className={classes.iconButton} onClick={this.handleMenuClick}>
                            <MenuIcon />
                        </IconButton>
                    </Tooltip>
                    <input className={classes.input} ref={ref => this.props.setInputRef(ref)} placeholder="搜尋地址" />
                    <IconButton className={classes.iconButton} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                    <Divider className={classes.divider} orientation="vertical" />
                    <Tooltip title="我在哪？">
                        <IconButton onClick={this.props.locateMe} color="primary" className={classes.iconButton} aria-label="directions">
                            <CenterFocusStrongIcon />
                        </IconButton>
                    </Tooltip>
                </Paper>
                {selectAllCheckbox}
                {districtCheckboxes}
            </div>
        );
    }
}

export const MapControlComponent = withStyles(styles as {})(MapControl);
