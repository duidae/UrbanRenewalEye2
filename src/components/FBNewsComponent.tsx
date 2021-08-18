import React from "react";
import {observer} from "mobx-react";
import {action, observable, makeObservable} from "mobx";
import {Badge, IconButton, Paper, Popover, Tooltip} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import NewReleasesIcon from "@material-ui/icons/NewReleases";

import {AppStore} from "stores";

const styles = theme => ({
    newsContainer: {
        padding: 10,
        width: 500,
        height: 281
    },
    news: {
        border: "none",
        overflow: "hidden"
    }
});

@observer
class FBNews extends React.Component<any, any> {
    @observable isNewsPopoverOpen: boolean;
    private newsPopoverAnchor;

    constructor(props) {
        super(props);
        makeObservable(this);
        this.newsPopoverAnchor = undefined;
        this.isNewsPopoverOpen = false;
    }

    @action private handleNewsPopoverOpen = event => {
        this.newsPopoverAnchor = event.currentTarget;
        this.isNewsPopoverOpen = true;
        AppStore.Instance.setNewsChecked();
    };

    @action private handleNewsPopoverClose = () => {
        this.newsPopoverAnchor = null;
        this.isNewsPopoverOpen = false;
    };

    public render() {
        const classes = this.props.classes;

        return (
            <div className={this.props.className}>
                <Popover
                    open={this.isNewsPopoverOpen}
                    anchorEl={this.newsPopoverAnchor}
                    onClose={this.handleNewsPopoverClose}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center"
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "center"
                    }}
                >
                    <Paper className={classes.newsContainer}>
                        <iframe
                            src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Furbanrenewaleye%2Fposts%2F1196450027544269&show_text=true&width=500"
                            width="500"
                            height="281"
                            title="News"
                            className={classes.news}
                        ></iframe>
                    </Paper>
                </Popover>
                <Tooltip title="看看新消息！">
                    <span>
                        <IconButton color="inherit" onClick={this.handleNewsPopoverOpen}>
                            <Badge invisible={AppStore.Instance.isNewsChecked} color="secondary" variant="dot">
                                <NewReleasesIcon fontSize="large" />
                            </Badge>
                        </IconButton>
                    </span>
                </Tooltip>
            </div>
        );
    }
}

export const FBNewsComponent = withStyles(styles as {})(FBNews);
