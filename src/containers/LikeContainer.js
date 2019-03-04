import React, { Component, Fragment } from 'react';
import LikeList from '../components/LikeList'

class LikeContainer extends Component {
    render() {
        // console.log(this.props.likeCards)
        return (
            <Fragment>
                <LikeList
                    likeCards={this.props.likeCards}
                    handleDeleteCard={this.props.handleDeleteCard}
                />
            </Fragment>
        )
    }
}

export default LikeContainer;