import React from "react";
import ReactDOM from "react-dom";
import {observer} from "mobx-react";
import {action, autorun, observable} from "mobx";
import GoogleMapReact from "google-map-react";
import {Backdrop, CircularProgress} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";

import {BadgesComponent, MapControlComponent} from ".";
import {AppStore} from "stores";
import {TAIPEI_CENTER} from "models";

const styles = theme => ({
    map: {
        height: "100vh"
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
});

@observer
class GoogleMap extends React.Component<any> {
    private map;
    private addressInput;

    @observable private isBackdropOpen: boolean;

    constructor(props) {
        super(props);

        this.isBackdropOpen = true;

        autorun(() => {
            // this.isBackdropOpen = true;
            this.loadData(this.map, AppStore.Instance.selectedGeojsons);
        });

        autorun(() => console.log(`${this.isBackdropOpen}`));
    }

    private loadMap = (map: any, maps: any) => {
        this.initMap(map, maps);
    };

    private initMap = (map: any, maps: any) => {
        this.map = map;

        // setup map control widget
        const mapControl = document.createElement("div");
        ReactDOM.render(
            <MapControlComponent
                locateMe={this.locateMe}
                setInputRef={ref => {
                    this.addressInput = ref;
                }}
            />,
            mapControl
        );
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

    // TODO: clean when reload?
    private loadData = (map: any, districtGeoJsons: string[]) => {
        if (!map || districtGeoJsons?.length <= 0) {
            return;
        }

        map.data.setStyle((feature: any) => {
            const color = feature.getProperty("status") === "有效" ? "green" : "gray";
            return {
                fillColor: color,
                strokeColor: color,
                clickable: true
            };
        });

        districtGeoJsons.forEach(districtGeoJson => map.data.loadGeoJson(districtGeoJson, {}, this.finishGeojsonLoading));

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

    @action private finishGeojsonLoading = () => {
        this.isBackdropOpen = false;
        console.log(`${this.isBackdropOpen}`);
        console.log("done");
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
                    bootstrapURLKeys={{
                        key: "YOUR_GOOGLE_APP_KEY",
                        libraries: ["places"]
                    }}
                    defaultCenter={TAIPEI_CENTER}
                    defaultZoom={14}
                    options={{streetViewControl: true, mapTypeControl: true}}
                    yesIWantToUseGoogleMapApiInternals={true}
                    onGoogleApiLoaded={({map, maps}) => this.loadMap(map, maps)}
                />
                <Backdrop className={classes.backdrop} open={this.isBackdropOpen} onClick={this.finishGeojsonLoading}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            </div>
        );
    }
}

export const GoogleMapComponent = withStyles(styles as {})(GoogleMap);
