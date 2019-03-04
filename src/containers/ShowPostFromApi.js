import React, { Component, Fragment } from 'react'
import FacebookPostCollection from './FacebookPostsCollection'

class ShowPostFromApi extends Component {
    render(){
        return(
            <Fragment>
                <FacebookPostCollection 
                    facebookPosts={this.props.facebookPosts}
                    handleFBCardClicked={this.props.handleFBCardClicked}
                    facebookUser={this.props.facebookUser}
                />
            </Fragment>
        )
    }
}

export default ShowPostFromApi;