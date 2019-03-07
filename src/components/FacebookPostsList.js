import React, {Component, Fragment} from 'react';
import FacebookPostsCard from './FacebookPostsCard'

class FacebookPostsList extends Component {
    render(){
        //  console.log(this.props)
         
        return (
            <div className="flexedList">
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
                   
            </div>
        )
    }
}

export default FacebookPostsList;