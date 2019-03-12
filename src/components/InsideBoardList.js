import React, { Component, Fragment } from 'react'
import InsideBoard from './InsideBoard'


class InsideBoardList extends Component {
    
    render() {
    //    console.log(this.props)
       
        return (
            <Fragment>
              {this.props.fav_post.favorite_posts.map(post => 
                // console.log(post)
                <InsideBoard 
                    post={post}
                    key={post.id + ""}
                />
                )}
            </Fragment>
        )
    }
}

export default InsideBoardList
