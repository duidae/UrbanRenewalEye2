import React from "react";
import GoogleMapReact from "google-map-react";
import {Fab} from "@material-ui/core";
import LayersIcon from "@material-ui/icons/Layers";
import "./GoogleMapComponent.scss";

import {Divider, IconButton, InputBase, Paper} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import StreetviewIcon from "@material-ui/icons/Streetview";
import CenterFocusStrongIcon from "@material-ui/icons/CenterFocusStrong";
import DirectionsIcon from '@material-ui/icons/Directions';

import {AppStore} from "stores";
// import {MapControlComponent} from ".";

const TAIPEI_CENTER: GoogleMapReact.Coords = {lat: 25.038357847174, lng: 121.54770626982};
const RENEWAL_GEOJSON = "renewalUnits_sample.json";

export class GoogleMapComponent extends React.Component {
    private map;
    private mapControlRef;
    private adRef;
    private layerPanelRef;

    private loadMap = (map: any, maps: any) => {
        this.initMap(map, maps);
        this.loadData(map, maps);
    };

    private initMap = (map: any, maps: any) => {
        this.map = map;
        map.controls[google.maps.ControlPosition.TOP_CENTER].push(this.mapControlRef);
        map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(this.layerPanelRef);
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

    private handleLocateMeClick = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position: GeolocationPosition) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    if (this.map) {
                        this.map.setCenter(pos);
                        const infoWindow = new google.maps.InfoWindow({position: pos, content: "我在這裡！"});
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

    private handleSideBySideModeClick = () => {
        AppStore.Instance.setSideBySideMode();
    };

    render() {
        return (
            <div className="map">
                <GoogleMapReact
                    defaultCenter={TAIPEI_CENTER}
                    defaultZoom={14}
                    options={{streetViewControl: true, mapTypeControl: true}}
                    yesIWantToUseGoogleMapApiInternals={true}
                    onGoogleApiLoaded={({map, maps}) => this.loadMap(map, maps)}
                />
                <Paper ref={ref => (this.mapControlRef = ref)} component="form">
                    <IconButton aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <InputBase
                        placeholder="搜尋地址..."
                        inputProps={{'aria-label': 'search google maps'}}
                    />
                    <IconButton aria-label="search">
                        <SearchIcon />
                    </IconButton>
                    <Divider orientation="vertical" />
                    <IconButton color="primary" aria-label="directions">
                        <DirectionsIcon />
                    </IconButton>
                    <IconButton onClick={this.handleLocateMeClick} color="primary" aria-label="Locate Me">
                        <CenterFocusStrongIcon />
                    </IconButton>
                    <IconButton onClick={this.handleSideBySideModeClick} color="primary" aria-label="Side by side mode">
                        <StreetviewIcon />
                    </IconButton>
                </Paper>
                <Fab ref={ref => (this.layerPanelRef = ref)} variant="extended">
                    <LayersIcon />
                    Layer
                </Fab>
            </div>
        );
    }
}
