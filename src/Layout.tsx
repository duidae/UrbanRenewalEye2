import React from "react";
import {AppBar, Badge, Link, IconButton, Toolbar, Typography} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import FacebookIcon from '@material-ui/icons/Facebook';
import GitHubIcon from '@material-ui/icons/GitHub';
import {Map} from "./components/Map";

const FB_FAN_PAGE = "https://www.facebook.com/urbanrenewaleye";
const GITHUB_REPO = "https://github.com/duidae/UrbanRenewalEye";

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
});

class Layout extends React.Component<any, any> {
    public render() {
        const classes = this.props.classes;
        const appBar = (
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        都市更新天眼通
                    </Typography>
                    <IconButton aria-label="show 4 new mails" color="inherit">
                        <Badge badgeContent={4} color="secondary">
                            <NotificationsActiveIcon />
                        </Badge>
                    </IconButton>
                    <Link href={FB_FAN_PAGE} color="inherit" target="_blank">
                        <FacebookIcon />
                    </Link>
                    <Link href={GITHUB_REPO} color="inherit" target="_blank">
                        <GitHubIcon />
                    </Link>
                </Toolbar>
            </AppBar>
        );

        return (
            <div className={classes.root}>
                {appBar}
                <main>
                    <Map/>
                </main>
            </div>
        );
    }
}

export default withStyles(styles as {})(Layout);
