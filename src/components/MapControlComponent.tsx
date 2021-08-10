import React from "react";
import {observer} from "mobx-react";
import {Divider, Link, IconButton, InputBase, Paper, Tooltip, Typography} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from "@material-ui/icons/Search";
import CenterFocusStrongIcon from "@material-ui/icons/CenterFocusStrong";

const HOME = "https://urbanrenewaleye.df.r.appspot.com/";

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
    title: { // TODO: change background to theme color
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        padding: "0 5px 0 5px",
        boxShadow: "0 0 10px white",
        borderRadius: "3px",
        height: 40,
        display: "flex",
        alignItems: "center",
        marginRight: theme.spacing(3)
    },
    control: {
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
    toggleButton: {
        border: 'none',
        height: 40
    },
    divider: {
        height: 28,
        margin: 4
    }
});

@observer
class MapControl extends React.Component<any, any> {
    private handleMenuClick = () => {
    };

    public render() {
        const classes = this.props.classes;

        return (
            <div className={classes.root}>
                <Link className={classes.title} color="inherit" href={HOME}>
                    <img className={classes.logo} src="logo.png" alt="都市更新天眼通" />
                    <Typography color="primary" variant="h6" noWrap>都市更新天眼通</Typography>
                </Link>
                <Paper component="form" className={classes.control}>
                    <Tooltip title="街景模式">
                        <IconButton color="primary" className={classes.iconButton} onClick={this.handleMenuClick}>
                            <MenuIcon />
                        </IconButton>
                    </Tooltip>
                    <InputBase className={classes.input} placeholder="搜尋地址" inputProps={{"aria-label": "search google maps"}} />
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
            </div>
        );
    }
}

export const MapControlComponent = withStyles(styles as {})(MapControl);
