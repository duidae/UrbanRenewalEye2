import React from "react";
import {observer} from "mobx-react";
import {action, observable, makeObservable} from "mobx";
import {Badge, IconButton, Popover, Typography} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";

import {AppStore} from "stores";

const styles = theme => ({
    appItems: {
        marginRight: theme.spacing(2)
    }
});

@observer
class Meetings extends React.Component<any, any> {
    @observable isMeetingPopoverOpen: boolean;
    private meetingPopoverAnchor;

    constructor(props) {
        super(props);
        makeObservable(this);
        this.meetingPopoverAnchor = undefined;
        this.isMeetingPopoverOpen = false;
    }

    @action private handleMeetingPopoverOpen = event => {
        this.meetingPopoverAnchor = event.currentTarget;
        this.isMeetingPopoverOpen = true;
    };

    @action private handleMeetingPopoverClose = () => {
        this.meetingPopoverAnchor = null;
        this.isMeetingPopoverOpen = false;
    };

    public render() {
        const classes = this.props.classes;
        const appStore = AppStore.Instance;

        return (
            <React.Fragment>
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
                    {appStore.meetings?.map((meeting, index) => {
                        return <Typography key={index}>{meeting?.title}</Typography>;
                    })}
                </Popover>
                <IconButton className={classes.appItems} aria-label="聽證會" color="inherit" disabled={!appStore.meetings?.length} onClick={this.handleMeetingPopoverOpen}>
                    <Badge badgeContent={appStore.meetings?.length} color="secondary">
                        <NotificationsActiveIcon />
                    </Badge>
                </IconButton>
            </React.Fragment>
        );
    }
}

export const MeetingsComponent = withStyles(styles as {})(Meetings);
