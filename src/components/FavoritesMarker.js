import React from "react";
import { Marker, InfoWindow } from "react-google-maps";
import FavoritesMapCard from './FavoritesMapCard'
import markerIcon from '../marker.png'

export default class FavoritesMarker extends React.Component {

    state = {
        isOpen: false,
        activeMarker: this.props.activeMarker
    }

    toggleOpen = () => {
        this.setState({ isOpen: !this.state.isOpen })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ activeMarker: nextProps.activeMarker })
    }

    render() {
        //   console.log(this.props)
        return (
            <Marker
                onClick={this.toggleOpen}
                position={this.props.location}
                // icon={markerIcon}
            >
                {this.state.isOpen && this.state.activeMarker ?
                    <InfoWindow maxWidth={800} defaultPosition={this.props.location} onCloseClick={this.props.onToggleOpen}>
                        <FavoritesMapCard
                            favorite={this.props.favorite}
                            toggleShowPage={this.props.toggleShowPage}
                        />
                    </InfoWindow> : null
                }
            </Marker>
        );
    }
}