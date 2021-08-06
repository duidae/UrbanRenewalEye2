import React from "react";
import {observer} from "mobx-react";
import {action, observable, makeObservable} from "mobx";
import {Badge, IconButton, Popover} from "@material-ui/core";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import {FixedSizeList as List} from "react-window";

import {AppStore} from "stores";

@observer
export class MeetingsComponent extends React.Component<any, any> {
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
        const appStore = AppStore.Instance;

        return (
            <div className={this.props.className}>
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
                    <List
                        height={500}
                        itemCount={appStore.meetings?.length}
                        itemSize={50}
                        width={500}
                    >
                        {({index, style}) => (
                            <div style={style}>{`[${index}]`}{appStore.meetings?.[index]?.title}</div>
                        )}
                    </List>
                </Popover>
                <IconButton aria-label="聽證會" color="inherit" disabled={!appStore.meetings?.length} onClick={this.handleMeetingPopoverOpen}>
                    <Badge badgeContent={appStore.meetings?.length} color="secondary">
                        <NotificationsActiveIcon />
                    </Badge>
                </IconButton>
            </div>
        );
    }
}
