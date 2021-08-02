import {Component} from "react";
import GoogleMapReact from "google-map-react";
import "./Map.scss";

const TAIPEI_CENTER: GoogleMapReact.Coords = {lat: 25.038357847174, lng: 121.54770626982};
const RENEWAL_GEOJSON = "renewalUnits_sample.json";

export class Map extends Component {
    private loadGeojson = (map: any, maps: any) => {
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
                    onGoogleApiLoaded={({map, maps}) => this.loadGeojson(map, maps)}
                ></GoogleMapReact>
            </div>
        );
    }
}
