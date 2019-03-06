import React from "react";
import FavoritesMap from "../components/FavoritesMap";
import { secrets } from '../scripts/secrets';
export default class FavoritesMapContainer extends React.Component {

	render() {
		return (
			<FavoritesMap
				favorites={this.props.favorites}
				googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${secrets.GOOGLE_MAPS_KEY}&v=3.exp&libraries=geometry,drawing,places`}
				loadingElement={<div style={{ height: `100%` }} />}
				containerElement={<div style={{ height: `700px` }} />}
				mapElement={<div style={{ height: `100%` }} />}
			/>
		);
	}
}