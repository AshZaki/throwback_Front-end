import React, {Component, Fragment} from 'react';
import GooglePostsList from '../components/GooglePostsList'

class GooglePostsCollection extends Component {
    render(){
        return (
            <Fragment>
                <GooglePostsList 
                    googlePosts={this.props.googlePosts}
                    handleGGCardClicked={this.props.handleGGCardClicked}
                    googleUser={this.props.googleUser}
                />
            </Fragment>
        )
    }
}

export default GooglePostsCollection;