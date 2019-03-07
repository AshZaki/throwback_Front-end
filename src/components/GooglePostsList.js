import React, {Component, Fragment} from 'react';
import GooglePostsCard from '../components/GooglePostsCard'

class GooglePostsList extends Component {
    render(){
        // debugger
        return (
            <div className="flexedList">
                
                {this.props.googlePosts.map(post =>
                    <GooglePostsCard 
                        post={post}
                        key={post.id + ''}
                        handleGGCardClicked={this.props.handleGGCardClicked}
                        googleUser={this.props.googleUser}
                    />
                )}
            </div>
        )
    }
}

export default GooglePostsList;