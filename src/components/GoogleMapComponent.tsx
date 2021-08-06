import React from "react";
import GoogleMapReact from "google-map-react";
import {Button, ButtonGroup} from "@material-ui/core";
import StreetviewIcon from '@material-ui/icons/Streetview';
import CenterFocusStrongIcon from '@material-ui/icons/CenterFocusStrong';
import "./GoogleMapComponent.scss";

const TAIPEI_CENTER: GoogleMapReact.Coords = {lat: 25.038357847174, lng: 121.54770626982};
const RENEWAL_GEOJSON = "renewalUnits_sample.json";

export class GoogleMapComponent extends React.Component {
    private controlPanelRef;
    private layerPanelRef;
    private adRef;

    private loadMap = (map: any, maps: any) => {
        this.initMap(map, maps);
        this.loadData(map, maps);
    };

    private initMap = (map: any, maps: any) => {
        map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(this.controlPanelRef);
        map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(this.adRef);
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
                <ButtonGroup ref={ref => (this.controlPanelRef = ref)} color="primary" orientation="vertical">
                    <Button><StreetviewIcon/></Button>
                    <Button><CenterFocusStrongIcon/></Button>
                </ButtonGroup>
                <div ref={ref => (this.adRef = ref)}/>
            </div>
        );
    }
}
