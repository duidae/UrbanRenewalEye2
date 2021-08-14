import {Link, Tooltip} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import FacebookIcon from "@material-ui/icons/Facebook";
import GitHubIcon from "@material-ui/icons/GitHub";

import {FBNewsComponent, MeetingsComponent} from ".";

const FB_FAN_PAGE = "https://www.facebook.com/urbanrenewaleye";
const GITHUB_REPO = "https://github.com/duidae/UrbanRenewalEye";

const styles = theme => ({
    root: {
        display: "flex",
        alignItems: "center",
        "& > *": {
            margin: theme.spacing(1)
        }
    },
    badge: {
        width: 40,
        height: 40,
        display: "flex",
        alignItems: "center"
    }
});

function Badges(props) {
    const classes = props.classes;

    return (
        <div className={classes.root}>
            <MeetingsComponent className={classes.badge} />
            <FBNewsComponent className={classes.badge} />
            <Tooltip title="都市更新天眼通Facebook粉專">
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
