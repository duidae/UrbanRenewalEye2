import {withStyles} from "@material-ui/core/styles";

import {GoogleMapComponent} from ".";

const styles = theme => ({
    root: {
        height: "100vh"
    },
});

function Layout(props) {
    const classes = props.classes;
    return (
        <div className={classes.root}>
            <GoogleMapComponent />
        </div>
    );
}

export const LayoutComponent = withStyles(styles as {})(Layout);
