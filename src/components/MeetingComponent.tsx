import React from "react";
import {Typography} from "@material-ui/core";

interface MeetingComponentProps {
    title: string;
}

export const MeetingComponent: React.FC<MeetingComponentProps> = props => {
    return (
        <Typography>{props.title}</Typography>
    );
};
