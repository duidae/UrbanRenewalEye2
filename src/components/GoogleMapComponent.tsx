import React from "react";
import ReactDOM from "react-dom";
import {observer} from "mobx-react";
import GoogleMapReact from "google-map-react";
import {withStyles} from "@material-ui/core/styles";

import {AdComponent, BadgesComponent, MapControlComponent} from ".";

const TAIPEI_CENTER: GoogleMapReact.Coords = {lat: 25.038357847174, lng: 121.54770626982};
const RENEWAL_GEOJSON = "renewalUnits_sample.json";

const styles = theme => ({
    map: {
        height: "100vh"
    },
});

@observer
class GoogleMap extends React.Component<any> {
    private map;

    private loadMap = (map: any, maps: any) => {
        this.initMap(map, maps);
        this.loadData(map, maps);
    };

    private initMap = (map: any, maps: any) => {
        this.map = map;

        const mapControl = document.createElement("div");
        ReactDOM.render(<MapControlComponent locateMe={this.locateMe} />, mapControl);
        map.controls[google.maps.ControlPosition.TOP_CENTER].push(mapControl);

        const badges = document.createElement("div");
        ReactDOM.render(<BadgesComponent />, badges);
        map.controls[google.maps.ControlPosition.TOP_RIGHT].push(badges);

        const ad = document.createElement("div");
        ReactDOM.render(<AdComponent />, ad);
        map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(ad);
    };

    private loadData = (map: any, maps: any) => {
        map.data.setStyle((feature: any) => {
            const color = feature.getProperty("status") === "有效" ? "green" : "gray";
            return {
                fillColor: color,
                strokeColor: color,
                clickable: true
            };
        });

        map.data.loadGeoJson(RENEWAL_GEOJSON);

        // Click event
        map.data.addListener("click", (event: any) => {
            const content = `${event.feature.getProperty("id")}<br>${event.feature.getProperty("type")}<br>${event.feature.getProperty("status")}`;
            const clickInfoWindow = new google.maps.InfoWindow({position: event.latLng, content: content});
            clickInfoWindow.open({map, shouldFocus: false});
        });

        // Hover event
        let mouseoverInfoWindow: any;
        map.data.addListener("mouseover", (event: any) => {
            const content = `${event.feature.getProperty("id")}<br>${event.feature.getProperty("type")}<br>${event.feature.getProperty("status")}`;
            mouseoverInfoWindow = new google.maps.InfoWindow({position: event.latLng, content: content});
            mouseoverInfoWindow.open({map, shouldFocus: false});
        });
        map.data.addListener("mouseout", (event: any) => {
            mouseoverInfoWindow?.close();
        });
    };

    private locateMe = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position: GeolocationPosition) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    if (this.map) {
                        this.map.setCenter(pos);
                        const infoWindow = new google.maps.InfoWindow({position: pos, content: "我在這！"});
                        infoWindow?.open({map: this.map, shouldFocus: false});
                    }
                },
                () => {
                    console.log("Error: The Geolocation service failed.");
                }
            );
        } else {
            // Browser doesn't support Geolocation
            console.log("Error: Your browser doesn't support geolocation.");
        }
    };

    render() {
        const classes = this.props.classes;

        return (
            <div className={classes.map}>
                <GoogleMapReact
                    defaultCenter={TAIPEI_CENTER}
                    defaultZoom={14}
                    options={{streetViewControl: true, mapTypeControl: true}}
                    yesIWantToUseGoogleMapApiInternals={true}
                    onGoogleApiLoaded={({map, maps}) => this.loadMap(map, maps)}
                />
            </div>
        );
    }
}

export const GoogleMapComponent = withStyles(styles as {})(GoogleMap);
