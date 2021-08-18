import React from "react";
import {observer} from "mobx-react";
import {action, observable, makeObservable} from "mobx";
import {Paper} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";

const styles = theme => ({
    root: {
        margin: 10,
        display: "flex",
        alignItems: "center",
        width: 450,
        height: 120
    }
});

@observer
class Ad extends React.Component<any, any> {
    @observable isAdOpen: boolean;

    constructor(props) {
        super(props);
        makeObservable(this);

        this.isAdOpen = true;
        setInterval(() => {
            if (!this.isAdOpen) {
                this.isAdOpen = true;
            }
        }, 5000);
    }

    @action private handleAdClose = () => {
        this.isAdOpen = false;
    };

    public render() {
        const classes = this.props.classes;

        return <Paper component="form" className={classes.root}></Paper>;
    }
}

export const AdComponent = withStyles(styles as {})(Ad);
