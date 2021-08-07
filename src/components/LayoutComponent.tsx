import {AppBar, Box, Link, Toolbar, Tooltip, Typography} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import FacebookIcon from "@material-ui/icons/Facebook";
import GitHubIcon from "@material-ui/icons/GitHub";

import {GoogleMapComponent, MeetingsComponent} from ".";

const HOME = "https://urbanrenewaleye.df.r.appspot.com/";
const FB_FAN_PAGE = "https://www.facebook.com/urbanrenewaleye";
const GITHUB_REPO = "https://github.com/duidae/UrbanRenewalEye";

const styles = theme => ({
    root: {
        flexGrow: 1,
        height: "100vh"
    },
    grow: {
        flexGrow: 1
    },
    mapContainer: {
        height: "calc(100% - 64px)" // TODO: is it possible not to minus "32px"?
    },
    logo: {
        maxWidth: 30,
        maxHeight: 30,
        marginRight: theme.spacing(1)
    },
    title: {
        display: "flex"
    },
    appItems: {
        marginRight: theme.spacing(2)
    }
});

function Layout(props) {
    const classes = props.classes;
    const appBar = (
        <AppBar position="static">
            <Toolbar>
                <Link className={classes.title} color="inherit" href={HOME}>
                    <img className={classes.logo} src="logo.png" alt="都市更新天眼通" />
                    <Typography variant="h6" noWrap>
                        都市更新天眼通
                    </Typography>
                </Link>
                <div className={classes.grow} />
                <MeetingsComponent className={classes.appItems} />
                <Tooltip title="Facebook">
                    <Link className={classes.appItems} href={FB_FAN_PAGE} color="inherit" target="_blank">
                        <FacebookIcon />
                    </Link>
                </Tooltip>
                <Tooltip title="Github">
                    <Link className={classes.appItems} href={GITHUB_REPO} color="inherit" target="_blank">
                        <GitHubIcon />
                    </Link>
                </Tooltip>
            </Toolbar>
        </AppBar>
    );

    return (
        <div className={classes.root}>
            {appBar}
            <Box className={classes.mapContainer}>
                <GoogleMapComponent />
            </Box>
        </div>
    );
}

export const LayoutComponent = withStyles(styles as {})(Layout);
