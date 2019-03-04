import React, {Component, Fragment} from 'react';
import FacebookPostsCard from './FacebookPostsCard'

class FacebookPostsList extends Component {
    render(){
        //  console.log(this.props.facebookPost)
         
        return (
            <Fragment>
                    {
                        this.props.facebookPosts.map(post => 
                             <FacebookPostsCard 
                             post={post}
                             key={post.id}
                             handleFBCardClicked={this.props.handleFBCardClicked}
                             facebookUser={this.props.facebookUser}
                          />
                        )
                    }
                   
            </Fragment>
        )
    }
}

export default FacebookPostsList;