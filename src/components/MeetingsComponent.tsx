import React from "react";
import {observer} from "mobx-react";
import {action, observable, makeObservable} from "mobx";
import {Avatar, Badge, Card, CardHeader, IconButton, Popover, Typography} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import {FixedSizeList as List} from "react-window";

import {AppStore} from "stores";

const MEETING_TYPE_KEY = "類別";
const MEETING_TYPE_COLOR_MAP = new Map<string, string>([
    ["聽證會", "red"],
    ["公聽會", "orange"],
    ["審議會", "blue"],
    ["公開展覽", "green"]
]);
const MEETING_TYPE_DEFAULT_COLOR = "gray";

const styles = theme => ({
    red: {
        backgroundColor: "red",
    },
    orange: {
        backgroundColor: "orange",
    },
    blue: {
        backgroundColor: "blue",
    },
    green: {
        backgroundColor: "green",
    },
    gray: {
        backgroundColor: "gray",
    },
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
                        width={500}
                        itemCount={appStore.meetings?.length}
                        itemSize={120}
                    >
                        {({index, style}) => {
                            const meeting = appStore.meetings?.[index];
                            const meetingType = meeting?.[MEETING_TYPE_KEY];
                            return (
                                <div style={style}>
                                <Card>
                                    <CardHeader
                                        avatar={
                                            <Avatar aria-label={MEETING_TYPE_KEY} className={classes[MEETING_TYPE_COLOR_MAP.get(meetingType) ?? MEETING_TYPE_DEFAULT_COLOR]}>
                                                {meetingType?.[0]}
                                            </Avatar>
                                        }
                                        title={<Typography>{`[${index + 1}/${appStore.meetings?.length}]${meeting?.title}`}</Typography>}
                                        subheader={<Typography>{`${meeting?.["會議開始時間"]} - ${meeting?.["會議結束時間"]}, ${meeting?.["地點"]}`}</Typography>}
                                    />
                                </Card>
                                </div>
                            );
                        }}
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

export const MeetingsComponent = withStyles(styles as {})(Meetings);
