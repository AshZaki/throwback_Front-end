import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import FavoritesMarker from "./FavoritesMarker";

const FavoritesMap = withScriptjs(withGoogleMap((props) => {
    console.log(props)
    const markers = props.favorites.map(favorite => {
        let marker = <FavoritesMarker
                        key={favorite.id}
                        uid={favorite.uid}
                        favorite={favorite}
                        closeMarkers={props.closeOtherMarkers}
                        toggleShowPage={props.toggleShowPage}
                        location={{ lat: parseFloat(favorite.latitude), lng: parseFloat(favorite.longitude) }}
                        activeMarker={favorite.uid === props.activeMarker ? true : false}
                    />
        return marker
    })

    return (
        <GoogleMap
            defaultZoom={5}
            center={{ lat: 38.90636, lng: -77.04197 }}
        >
            {markers}
        </GoogleMap>
    );
}
))

export default FavoritesMap;