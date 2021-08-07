import React from "react";
import {observer} from "mobx-react";
import {action, observable, makeObservable} from "mobx";
import {Button, Snackbar} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";

const styles = theme => ({});

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

        return this.isAdOpen && <Button onClick={this.handleAdClose}>close</Button>;
    }
}

export const AdComponent = withStyles(styles as {})(Ad);
