import React from "react";
import ReactDOM from "react-dom";
import {observer} from "mobx-react";
import {autorun} from "mobx";
import GoogleMapReact from "google-map-react";
import {withStyles} from "@material-ui/core/styles";

import {BadgesComponent, MapControlComponent} from ".";
import {AppStore} from "stores";
import {DEFAULT_ZOOM, TAIPEI_CENTER, TAIPEI_DISTRICTS_GEOJSON} from "models";

const styles = theme => ({
    map: {
        height: "100vh"
    }
});

type GeoJsonPath = string;
type GoogleMapData = google.maps.Data | undefined;

@observer
class GoogleMap extends React.Component<any> {
    private map: any;
    private addressInput;
    private districtData: GoogleMapData;
    private dataMap: Map<GeoJsonPath, GoogleMapData>;

    constructor(props) {
        super(props);

        this.districtData = undefined;
        this.dataMap = new Map<GeoJsonPath, GoogleMapData>([]);

        autorun(() => {
            // this.moveCenterTo(AppStore.Instance.selectedAreaCenterAndZoom);
        });

        autorun(() => {
            this.handleSelectedGeojsons(AppStore.Instance.selectedGeojsonPaths);
        });
    }

    private getInputRef = ref => {
        this.addressInput = ref;
    };

    private initMap = (map: any, maps: any) => {
        this.map = map;
        this.districtData = new google.maps.Data();
        this.districtData.loadGeoJson(TAIPEI_DISTRICTS_GEOJSON);
        this.districtData.setStyle((feature: any) => {
            return {
                fillOpacity: 0,
                strokeColor: "gray", // TODO: change color to the blue theme color
                clickable: false
            };
        });
        this.dataMap.set(TAIPEI_DISTRICTS_GEOJSON, this.districtData);

        // setup map control widget
        const mapControl = document.createElement("div");
        ReactDOM.render(<MapControlComponent locateMe={this.locateMe} setInputRef={this.getInputRef} />, mapControl);
        map.controls[google.maps.ControlPosition.TOP_CENTER].push(mapControl);
        const searchBox = new google.maps.places.SearchBox(this.addressInput);
        map.addListener("bounds_changed", () => {
            searchBox.setBounds(map.getBounds() as google.maps.LatLngBounds);
        });
        let markers: google.maps.Marker[] = []; // TODO: add marker
        searchBox.addListener("places_changed", () => {
            const places = searchBox.getPlaces();
            if (places?.length === 0) {
                return;
            }

            // Clear out the old markers.
            markers.forEach(marker => {
                marker.setMap(null);
            });
            markers = [];

            // For each place, get the icon, name and location.
            const bounds = new google.maps.LatLngBounds();
            places?.forEach(place => {
                if (!place.geometry || !place.geometry.location) {
                    console.log("Returned place contains no geometry");
                    return;
                }
                const icon = {
                    url: place.icon as string,
                    size: new google.maps.Size(71, 71),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(17, 34),
                    scaledSize: new google.maps.Size(25, 25)
                };

                // Create a marker for each place.
                markers.push(
                    new google.maps.Marker({
                        map,
                        icon,
                        title: place.name,
                        position: place.geometry.location
                    })
                );

                if (place.geometry.viewport) {
                    // Only geocodes have viewport.
                    bounds.union(place.geometry.viewport);
                } else {
                    bounds.extend(place.geometry.location);
                }
            });
            map.fitBounds(bounds);
        });

        // setup badges
        const badges = document.createElement("div");
        ReactDOM.render(<BadgesComponent />, badges);
        map.controls[google.maps.ControlPosition.TOP_RIGHT].push(badges);
    };

    private handleSelectedGeojsons = (selectedGeojsonPaths: string[]) => {
        selectedGeojsonPaths?.forEach(selectedGeojsonPath => {
            if (!this.dataMap.has(selectedGeojsonPath)) {
                this.dataMap.set(selectedGeojsonPath, this.createData(selectedGeojsonPath));
            }
        });
        this.showDataOnMap(selectedGeojsonPaths);
    };

    private createData = (geojsonPath: string): google.maps.Data => {
        let data = new google.maps.Data();
        data.loadGeoJson(geojsonPath);

        data.setStyle((feature: any) => {
            const color = feature.getProperty("status") === "有效" ? "green" : "gray";
            return {
                fillColor: color,
                strokeColor: color,
                clickable: true
            };
        });
        /* TODO: enable event handlers
        // Click event
        data.addListener("click", (event: any) => {
            const content = `${event.feature.getProperty("id")}<br>${event.feature.getProperty("type")}<br>${event.feature.getProperty("status")}`;
            const clickInfoWindow = new google.maps.InfoWindow({position: event.latLng, content: content});
            clickInfoWindow.open({this.map, shouldFocus: false});
        })
        // Hover event
        let mouseoverInfoWindow: any;
        data.addListener("mouseover", (event: any) => {
            const content = `${event.feature.getProperty("id")}<br>${event.feature.getProperty("type")}<br>${event.feature.getProperty("status")}`;
            mouseoverInfoWindow = new google.maps.InfoWindow({position: event.latLng, content: content});
            mouseoverInfoWindow.open({map, shouldFocus: false});
        });
        data.addListener("mouseout", (event: any) => {
            mouseoverInfoWindow?.close();
        });
        */
        return data;
    };

    private showDataOnMap = (selectedGeojsons: string[]) => {
        if (!this.map) {
            return;
        }

        this.dataMap.forEach((data, geojson) => {
            data?.setMap(selectedGeojsons?.includes(geojson) ? this.map : null);
        });

        // TODO: show district geojson individually
        this.districtData?.setMap(selectedGeojsons?.length > 0 ? this.map : null);
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

    private moveCenterTo = (centerAndZoom: {center: {lat: number; lng: number}; zoom: number}) => {
        if (this.map && centerAndZoom?.center && centerAndZoom?.zoom) {
            this.map.setZoom(centerAndZoom.zoom);
            this.map.panTo(centerAndZoom.center);
        }
    };

    render() {
        const classes = this.props.classes;

        return (
            <div className={classes.map}>
                <GoogleMapReact
                    bootstrapURLKeys={{
                        key: "YOUR_GOOGLE_APP_KEY",
                        libraries: ["places"]
                    }}
                    defaultCenter={TAIPEI_CENTER}
                    defaultZoom={DEFAULT_ZOOM}
                    options={{streetViewControl: true, mapTypeControl: true}}
                    yesIWantToUseGoogleMapApiInternals={true}
                    onGoogleApiLoaded={({map, maps}) => this.initMap(map, maps)}
                />
            </div>
        );
    }
}

export const GoogleMapComponent = withStyles(styles as {})(GoogleMap);
