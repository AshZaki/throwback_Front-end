import React, { Component, Fragment } from 'react';
import FacebookPostsList from '../components/FacebookPostsList'
import FacebookPostsCard from '../components/FacebookPostsCard'
import { Masonry } from 'gestalt';
import 'gestalt/dist/gestalt.css';
class FacebookPostsCollection extends Component {
    render() {
        // console.log(this.props)


        return (
            <div
            style={{
                maxWidth: "1000px",
                display: "block",
                margin: "0 auto",
              }}>
                {/* <Masonry
                    comp={FacebookPostsCard}
                    items={this.props.facebookPosts}
                    minCols={1}
                    gutterWidth={40}
                /> */}
                <FacebookPostsList
                    facebookPosts={this.props.facebookPosts}
                    handleFBCardClicked={this.props.handleFBCardClicked}
                    facebookUser={this.props.facebookUser}
                />
            </div>
        )
    }
}

export default FacebookPostsCollection;