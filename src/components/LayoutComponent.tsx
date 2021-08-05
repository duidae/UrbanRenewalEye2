import React from "react";
import {observer} from "mobx-react";
import {action, observable, makeObservable} from "mobx";
import {AppBar, Box, Badge, Link, IconButton, Popover, Toolbar, Typography} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import FacebookIcon from "@material-ui/icons/Facebook";
import GitHubIcon from "@material-ui/icons/GitHub";
import {AppStore} from "stores";
import {GoogleMapComponent, MeetingComponent} from ".";

const HOME = "https://urbanrenewaleye.df.r.appspot.com/";
const FB_FAN_PAGE = "https://www.facebook.com/urbanrenewaleye";
const GITHUB_REPO = "https://github.com/duidae/UrbanRenewalEye";

const styles = theme => ({
    root: {
        display: "flex",
        flexFlow: "column",
        height: "100vh"
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
        display: "flex",
    }
});

@observer
class Layout extends React.Component<any, any> {
    @observable isMeetingPopoverOpen: boolean;
    private meetingPopoverAnchor;

    @action private handleMeetingPopoverOpen = event => {
        this.meetingPopoverAnchor = event.currentTarget;
        this.isMeetingPopoverOpen = true;
    };

    @action private handleMeetingPopoverClose = () => {
        this.meetingPopoverAnchor = null;
        this.isMeetingPopoverOpen = false;
    };

    constructor(props) {
        super(props);
        makeObservable(this);
        this.isMeetingPopoverOpen = false;
    }

    public render() {
        const classes = this.props.classes;
        const meetingPopover = (
            <Popover
                open={this.isMeetingPopoverOpen}
                anchorEl={this.meetingPopoverAnchor}
                onClose={this.handleMeetingPopoverClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center"
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center"
                }}
            >
                {AppStore.Instance.meetings?.map((meeting, index) => {
                    return <MeetingComponent key={index} title={meeting?.title} />;
                })}
            </Popover>
        );

        const meetingNum = AppStore.Instance.meetings?.length;
        const appBar = (
            <AppBar position="static">
                <Toolbar>
                    <Link className={classes.title} href={HOME} color="inherit">
                        <img className={classes.logo} src="logo.png" alt="都市更新天眼通"/>
                        <Typography variant="h6">
                            都市更新天眼通
                        </Typography>
                    </Link>
                    {meetingPopover}
                    <IconButton aria-label="聽證會" color="inherit" disabled={!meetingNum} onClick={this.handleMeetingPopoverOpen}>
                        <Badge badgeContent={meetingNum} color="secondary">
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
                <Box className={classes.mapContainer}>
                    <GoogleMapComponent />
                </Box>
            </div>
        );
    }
}

export const LayoutComponent = withStyles(styles as {})(Layout);
