import React from "react";
import {observer} from "mobx-react";
import {Divider, IconButton, InputBase, Paper} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import StreetviewIcon from "@material-ui/icons/Streetview";
import CenterFocusStrongIcon from "@material-ui/icons/CenterFocusStrong";
import DirectionsIcon from '@material-ui/icons/Directions';

const styles = theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
});

@observer
class MapControl extends React.Component<any, any> {
    public render() {
        const classes = this.props.classes;
        return (
            <Paper component="form" className={classes.root}>
              <IconButton className={classes.iconButton} aria-label="menu">
                <MenuIcon />
              </IconButton>
              <InputBase
                className={classes.input}
                placeholder="Search Google Maps"
                inputProps={{ 'aria-label': 'search google maps' }}
              />
              <IconButton type="submit" className={classes.iconButton} aria-label="search">
                <SearchIcon />
              </IconButton>
              <Divider className={classes.divider} orientation="vertical" />
              <IconButton color="primary" className={classes.iconButton} aria-label="directions">
                <DirectionsIcon />
              </IconButton>
              <IconButton color="primary" className={classes.iconButton} aria-label="directions">
                <CenterFocusStrongIcon />
              </IconButton>
              <IconButton color="primary" className={classes.iconButton} aria-label="directions">
                <StreetviewIcon />
              </IconButton>
            </Paper>
        );
    }
}

export const MapControlComponent = withStyles(styles as {})(MapControl);
