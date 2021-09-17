import React from "react";
import {observer} from "mobx-react";
import {action, observable, makeObservable} from "mobx";
import {Avatar, Badge, Card, CardHeader, IconButton, Popover, Tooltip, Typography} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import {FixedSizeList as List} from "react-window";

import {AppStore} from "stores";

enum MeetingKey {
    TYPE = "類別",
    START_TIME = "會議開始時間",
    END_TIME = "會議結束時間",
    LOCATION = "地點"
}

enum MeetingType {
    HEARING = "聽證會",
    PUBLIC_HEARING = "公聽會",
    REVIEW = "審議會",
    PUBLIC_EXHIBITION = "公開展覽",
    OTHERS = "其他會議"
}

const MEETING_TYPE_ACRONYM = new Map<MeetingType, string>([
    [MeetingType.HEARING, "聽"],
    [MeetingType.PUBLIC_HEARING, "公"],
    [MeetingType.REVIEW, "審"],
    [MeetingType.PUBLIC_EXHIBITION, "展"],
    [MeetingType.OTHERS, "其"]
]);
const MEETING_TYPE_DEFAULT_ACRONYM = MEETING_TYPE_ACRONYM.get(MeetingType.OTHERS);
/*
const MEETING_TYPE_COLOR_MAP = new Map<MeetingType, string>([
    [MeetingType.HEARING, "red"],
    [MeetingType.PUBLIC_HEARING, "orange"],
    [MeetingType.REVIEW, "blue"],
    [MeetingType.PUBLIC_EXHIBITION, "green"]
]);
*/

const MEETING_TYPE_COLOR_MAP = new Map<string, string>([
    ["聽證會", "red"],
    ["公聽會", "orange"],
    ["審議會", "green"],
    ["公開展覽", "blue"]
]);
const MEETING_TYPE_DEFAULT_COLOR = "gray";

const styles = theme => ({
    red: {
        backgroundColor: "red"
    },
    orange: {
        backgroundColor: "orange"
    },
    blue: {
        backgroundColor: "blue"
    },
    green: {
        backgroundColor: "green"
    },
    gray: {
        backgroundColor: "gray"
    }
});

@observer
class Meetings extends React.Component<any, any> {
    private meetingIconRef;
    @observable isMeetingPopoverOpen: boolean;

    constructor(props) {
        super(props);
        makeObservable(this);
        this.isMeetingPopoverOpen = false;
    }

    private getMeetingIconRef = ref => {
        this.meetingIconRef = ref;
    };

    @action private handleMeetingPopoverOpen = () => {
        this.isMeetingPopoverOpen = true;
        AppStore.Instance.setMeetingChecked();
    };

    @action private handleMeetingPopoverClose = () => {
        this.isMeetingPopoverOpen = false;
    };

    public render() {
        const classes = this.props.classes;
        const appStore = AppStore.Instance;

        return (
            <div className={this.props.className}>
                <Popover
                    open={this.isMeetingPopoverOpen}
                    anchorEl={this.meetingIconRef}
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
                    <List height={500} width={500} itemCount={appStore.meetings?.length} itemSize={120}>
                        {({index, style}) => {
                            const meeting = appStore.meetings?.[index];
                            const meetingType = meeting?.[MeetingKey.TYPE];
                            return (
                                <div style={style}>
                                    <Card>
                                        <CardHeader
                                            avatar={
                                                <Avatar variant="square" aria-label={MeetingKey.TYPE} className={classes[MEETING_TYPE_COLOR_MAP.get(meetingType) ?? MEETING_TYPE_DEFAULT_COLOR]}>
                                                    {MEETING_TYPE_ACRONYM.get(meetingType as MeetingType) ?? MEETING_TYPE_DEFAULT_ACRONYM}
                                                </Avatar>
                                            }
                                            title={<Typography>{`[${index + 1}/${appStore.meetings?.length}]${meeting?.title}`}</Typography>}
                                            subheader={<Typography>{`${meeting?.[MeetingKey.START_TIME]} - ${meeting?.[MeetingKey.END_TIME]}, ${meeting?.[MeetingKey.LOCATION]}`}</Typography>}
                                        />
                                    </Card>
                                </div>
                            );
                        }}
                    </List>
                </Popover>
                <Tooltip title="臺北市政府都市更新會議列表">
                    <span>
                        <IconButton aria-label="聽證會" color="inherit" ref={this.getMeetingIconRef} disabled={!appStore.meetings?.length} onClick={this.handleMeetingPopoverOpen}>
                            <Badge invisible={AppStore.Instance.isMeetingChecked} badgeContent={appStore.meetings?.length} color="secondary">
                                <NotificationsActiveIcon fontSize="large" />
                            </Badge>
                        </IconButton>
                    </span>
                </Tooltip>
            </div>
        );
    }
}

export const MeetingsComponent = withStyles(styles as {})(Meetings);
