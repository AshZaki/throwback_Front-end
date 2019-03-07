import React, { Component, Fragment } from 'react'
import FacebookPostCollection from './FacebookPostsCollection'
import GooglePostCollection from './GooglePostsCollection'

class ShowPostFromApi extends Component {
    render(){
        console.log(this.props.facebookPosts)
        return(
            <Fragment>
                <FacebookPostCollection 
                    facebookPosts={this.props.facebookPosts}
                    handleFBCardClicked={this.props.handleFBCardClicked}
                    facebookUser={this.props.facebookUser} 
                />
                <GooglePostCollection 
                    googlePosts={this.props.googlePosts}
                    handleGGCardClicked={this.props.handleGGCardClicked}
                    googleUser={this.props.googleUser}
                />
            </Fragment>
        )
    }
}

export default ShowPostFromApi;