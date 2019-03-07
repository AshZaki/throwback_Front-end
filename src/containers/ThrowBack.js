import React, { Component, Fragment } from 'react'
import Navbar from './Navbar'
import ShowPostFromApi from './ShowPostFromApi'
import Profile from '../components/Profile'
import LikeContainer from './LikeContainer'
import BoardCollection from './BoardCollection'
import { Box, Column, Icon, SegmentedControl, } from 'gestalt';
import 'gestalt/dist/gestalt.css';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import FavoritesMapContainer from './FavoritesMapContainer';
import Search from '../components/Search'


class ThrowBack extends Component {
    constructor(props) {
        super(props)
        this.state = {
            likeCards: [],
            allBoard: [],
            userFBAccount: [],
            userGGAccount: [],
            facebookUser: null,
            facebookPosts: [],
            googlePosts: [],
            itemIndex: 0,
            isFacebookLoggedIn: false,
            isGooglePhotosLoggedIn: false,
        }
        this.handleItemChange = this.handleItemChange.bind(this);
    }

    handleItemChange({ activeIndex }) {
        this.setState(prevState => ({ itemIndex: activeIndex }));
    };

    componentDidMount() {
        this.getAllFavoritePosts()
        this.getAllBoards()
    }

    getAllFavoritePosts() {
        fetch('http://localhost:4000/api/v1/favorite_posts')
            .then(res => res.json())
            .then(likeCardsObj => {
                this.setState({
                    likeCards: likeCardsObj
                })
            })
    }

    getAllBoards() {
        fetch('http://localhost:4000/api/v1/boards')
            .then(res => res.json())
            .then(boards => {
                this.setState({
                    allBoard: boards
                })
            })
    }

    onGooglePhotosLoggedIn = (GgUserObj, currentUser) => {
        // console.log(GgUserObj, currentUser)
        fetch('http://localhost:4000/api/v1/accounts', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                auth_name: currentUser.username,
                auth_token: GgUserObj.GGToken,
                user_id: currentUser.id,
                social_id: 4
            })
        })
        .then(res => res.json())
        .then(GGUser =>
            // console.log(GGUser))
            this.setState({
                userGGAccount: GGUser,
                isGooglePhotosLoggedIn: true
            })
        )
    }

    handleGooglePosts = (googlePost) => {
        console.log(googlePost)
        this.setState({
            googlePosts: googlePost
        }) 
    }

    handleGGCardClicked = (GGcard, GGaccount) => {
        // debugger
        // console.log(fbcard)
        const data = {
            account_id: GGaccount.id,
            board_id: 2,
            created_time: GGcard.creationTime,
            message: null,
            full_picture: GGcard.baseUrl,
            place_name: null,
            latitude: null,
            longitude: null,
        }
        fetch('http://localhost:4000/api/v1/favorite_posts', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(newGGCard =>
                // console.log(newGGCard)
                this.setState({
                    likeCards: [newGGCard, ...this.state.likeCards]
                })
            )
    }

    onFacebookLoggedIn = (fbUserObj, currentUser) => {
        // debugger
        console.log('you did it', fbUserObj, currentUser)
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
            console.log('logging into fb')
            this.setState({
                userFBAccount: fbUser,
                isFacebookLoggedIn: true
            })
        })
    }

    handleFacebookPosts = (post) => {
        console.log(post)
        this.setState({
            facebookPosts: post
        })
    }

    handleFBCardClicked = (fbcard, fbaccount) => {
        // debugger
        // console.log(fbcard)
        const data = {
            account_id: fbaccount.id,
            board_id: 1,
            created_time: fbcard.created_time,
            message: fbcard.message,
            full_picture: (!fbcard.attachments.data[0].media? fbcard.full_picture : fbcard.attachments.data[0].media.image.src ),
            place_name: (!fbcard.place ? null : fbcard.place.name),
            latitude: (!fbcard.place ? null : fbcard.place.location.latitude),
            longitude: (!fbcard.place ? null : fbcard.place.location.longitude)
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
                    likeCards: [newFBCard, ...this.state.likeCards]
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
                // console.log(clickedCard)
                this.setState({
                    likeCards: this.state.likeCards.filter(card => card.id !== cardID)
                })
                console.log(this.state)
            })
    }

    createNewBoard = (board, currentUser) => {
        // console.log(board, currentUser)
        fetch('http://localhost:4000/api/v1/boards', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                user_id: currentUser.id,
                name: board.name,
                description: board.description,
            })
        }).then(res => res.json())
            .then(newBoard =>
                // console.log(newBoard)
                this.setState({
                    allBoard: [...this.state.allBoard, newBoard]
                })
            )
    }

    editBoard = (boardEdit, myBoard, currentUser) => {
        // console.log(board, user)
        fetch(`http://localhost:4000/api/v1/boards/${myBoard.id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                user_id: currentUser.id,
                name: boardEdit.name,
                description: boardEdit.description,
            })
        })
        .then(res => res.json())
        .then(newEditBoard => {
            const allBoardsCopy = [...this.state.allBoard];
            for(let i = 0; i < allBoardsCopy.length; i++) {
                if(allBoardsCopy[i].id === newEditBoard.id) {
                    allBoardsCopy[i] = newEditBoard;
                    break;
                }
            }
            this.setState({
                allBoard: allBoardsCopy
            })
        })

    }

    handleDeleteBoard = (boardID) => {
        console.log(boardID)
        fetch(`http://localhost:4000/api/v1/boards/${boardID}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(board => {
                // console.log(board)
                this.setState({
                    allBoard: this.state.allBoard.filter(board => board.id !== boardID)
                })
            })
    }

    render() {
        // console.log(this.props)
        const items = [
            'Search',
            'Favorited',
            'Boards',
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
                />

                <Profile
                    loginUser={this.props.logged_in}
                    onGGSuccess={this.onGooglePhotosLoggedIn}
                    onSuccess={this.onFacebookLoggedIn}
                    handleFacebookPosts={this.handleFacebookPosts}
                    isFacebookLoggedIn={this.state.isFacebookLoggedIn}
                    isGooglePhotosLoggedIn={this.state.isGooglePhotosLoggedIn}
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
                {this.state.itemIndex === 0 ?
                    <Box display="flex" direction="row" paddingY={2}>
                        <Column span={1}></Column>
                        <Column span={10}>
                            <Search
                                handleFacebookPosts={this.handleFacebookPosts}
                                handleGooglePosts={this.handleGooglePosts}
                                googleUser={this.state.userGGAccount}
                                facebookPosts={this.state.facebookPosts}
                                googlePosts={this.state.googlePosts}
                                facebookUser={this.state.userFBAccount}
                                isFacebookLoggedIn={this.state.isFacebookLoggedIn}
                                isGooglePhotosLoggedIn={this.state.isGooglePhotosLoggedIn}
                                handleFBCardClicked={this.handleFBCardClicked}
                                handleGGCardClicked={this.handleGGCardClicked}
                            />
                            </Column>
                        <Column span={1}></Column>
                    </Box>
                : null}
                {this.state.itemIndex === 1 ?
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
                {this.state.itemIndex === 2 ?
                    <Box display="flex" direction="row" paddingY={2}>
                        <Column span={1}></Column>
                        <Column span={10}>
                            <BoardCollection
                                currentUser={this.props.logged_in}
                                createNewBoard={this.createNewBoard}
                                allBoard={this.state.allBoard}
                                editBoard={this.editBoard}
                                handleDeleteBoard={this.handleDeleteBoard}
                            />
                        </Column>
                        <Column span={1}></Column>
                    </Box>
                    : null}
                
                {this.state.itemIndex === 3 ? // map
                    <Box display="flex" direction="row" paddingY={2}>
                        <Column span={1}></Column>
                        <Column span={10}>
                            <FavoritesMapContainer
                                favorites={this.state.likeCards}
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