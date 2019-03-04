import React, { Component, Fragment } from 'react'
import Navbar from './Navbar'
import ShowPostFromApi from './ShowPostFromApi'
import Profile from '../components/Profile'
import LikeContainer from './LikeContainer'
import BoardCollection from './BoardCollection'
import { Box, Column, Icon, SegmentedControl, } from 'gestalt';
import 'gestalt/dist/gestalt.css';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'

class ThrowBack extends Component {
    constructor(props) {
        super(props)
        this.state = {
            likeCards: [],
            allBoard: [],
            userFBAccount: [],
            facebookUser: null,
            facebookPosts: [],
            itemIndex: 0,
        }
        this.handleItemChange = this.handleItemChange.bind(this);
    }

    handleItemChange({ activeIndex }) {
        this.setState(prevState => ({ itemIndex: activeIndex }));
    };

    componentDidMount() {
        fetch('http://localhost:4000/api/v1/favorite_posts')
            .then(res => res.json())
            .then(likeCardsObj => {
                this.setState({
                    likeCards: likeCardsObj
                })
            })
    }

    onFacebookLoggedIn = (fbUserObj, currentUser) => {
        // console.log('you did it', fbUserObj, currentUser)
        fetch('http://localhost:4000/api/v1/accounts', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                auth_name: currentUser.username,
                auth_token: fbUserObj.fbAccessToken,
                user_id: currentUser.id,
                social_id: 1
            })
        })
            .then(res => res.json())
            .then(fbUser => {
                this.setState({
                    userFBAccount: fbUser
                })
            })
    }

    handleFacebookPosts = (post) => {
        // console.log(post)
        this.setState({
            facebookPosts: post
        })
    }

    handleFBCardClicked = (fbcard, fbaccount) => {
        // debugger
        console.log(fbcard)
        const data = {
            account_id: fbaccount.id,
            board_id: 1,
            created_time: fbcard.created_time,
            message: fbcard.message,
            full_picture: fbcard.full_picture,
            place_name: (!fbcard.place ? "N/A" : fbcard.place.name),
        }
        fetch('http://localhost:4000/api/v1/favorite_posts', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(newFBCard =>
                // console.log(newFBCard)
                this.setState({
                    likeCards: [...this.state.likeCards, newFBCard]
                })
            )
    }

    handleDeleteCard = (cardID) => {
        // console.log(card)
        // console.log('Clicked!')
        fetch(`http://localhost:4000/api/v1/favorite_posts/${cardID}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(clickedCard => {
                debugger
                // console.log(clickedCard)
                this.setState({
                    likeCards: this.state.likeCards.filter(card => card.id !== cardID)
                })
                console.log(this.state)
            })
    }

    createNewBoard = (board, currentUser) => {
        console.log(board, currentUser)

    }

    render() {
        // console.log(this.props)
        const items = [
            'Like',
            'Board',
            'Map',
            <Icon
                icon="location"
                accessibilityLabel="Location"
                color={this.state.itemIndex === 3 ? 'darkGray' : 'gray'}
            />,
        ]
        return (
            <Fragment>
                <Navbar
                    currentUser={this.props.logged_in}
                    onLogOut={this.props.onLogOut}
                    addNewToken={this.addNewToken}
                    onFacebookLoggedIn={this.onFacebookLoggedIn}
                    handleFacebookPosts={this.handleFacebookPosts}
                />

                <Profile
                    loginUser={this.props.logged_in}
                />

                <Box display="flex" direction="row" paddingY={2}>
                    <Column span={1}></Column>
                    <Column span={10}>
                        <SegmentedControl
                            items={items}
                            selectedItemIndex={this.state.itemIndex}
                            onChange={this.handleItemChange}
                        />
                    </Column>
                    <Column span={1}></Column>
                </Box>

                <ShowPostFromApi
                    facebookPosts={this.state.facebookPosts}
                    facebookUser={this.state.userFBAccount}
                    handleFBCardClicked={this.handleFBCardClicked}
                />
                {this.state.itemIndex === 0 ?
                    <Box display="flex" direction="row" paddingY={2}>
                        <Column span={1}></Column>
                        <Column span={10}>
                            <LikeContainer
                                likeCards={this.state.likeCards}
                                handleDeleteCard={this.handleDeleteCard}

                            />
                        </Column>
                        <Column span={1}></Column>
                    </Box>

                    : null}
                {this.state.itemIndex === 1 ?
                    <Box display="flex" direction="row" paddingY={2}>
                        <Column span={1}></Column>
                        <Column span={10}>
                            <BoardCollection
                                currentUser={this.props.logged_in}
                                createNewBoard={this.createNewBoard}
                            />
                        </Column>
                        <Column span={1}></Column>
                    </Box>
                    : null}
            </Fragment>
        )
    }
}

export default ThrowBack;