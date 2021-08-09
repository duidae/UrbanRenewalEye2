import {Link, Tooltip} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import FacebookIcon from "@material-ui/icons/Facebook";
import GitHubIcon from "@material-ui/icons/GitHub";

import {MeetingsComponent} from ".";

const FB_FAN_PAGE = "https://www.facebook.com/urbanrenewaleye";
const GITHUB_REPO = "https://github.com/duidae/UrbanRenewalEye";

const styles = theme => ({
    vertical: { // TODO: remove duplicates
       display: "flex",
       flexDirection: "column",
       alignItems: "center",
       margin: 10
    },
    horizontal: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        margin: 10
    },
    badge: {
        width: 40,
        height: 40,
        display: "flex",
        alignItems: "center",
    }
});

function Badges(props) {
    const classes = props.classes;

    return (
        <div className={props.orientation === "vertical" ? classes.vertical : classes.horizontal}>
            <MeetingsComponent className={classes.badge} />
            <Tooltip title="Facebook">
                <Link className={classes.badge} href={FB_FAN_PAGE} color="inherit" target="_blank">
                    <FacebookIcon fontSize="large" />
                </Link>
            </Tooltip>
            <Tooltip title="Github">
                <Link className={classes.badge} href={GITHUB_REPO} color="inherit" target="_blank">
                    <GitHubIcon fontSize="large" />
                </Link>
            </Tooltip>
        </div>
    );
}

export const BadgesComponent = withStyles(styles as {})(Badges);
