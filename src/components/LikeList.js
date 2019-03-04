import React, { Component, Fragment } from 'react';
import LikeCard from '../components/LikeCard'

class LikeList extends Component {
    render() {
        return (
            <Fragment>
                {this.props.likeCards.map(cardObj =>
                     <LikeCard 
                        card={cardObj}
                        key={cardObj.id}
                        handleDeleteCard={this.props.handleDeleteCard}
                     />  
                )}
            </Fragment>

        )
    }
}

export default LikeList;