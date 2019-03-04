/*global FB*/
/*global gapi*/
/*global auth2*/
import React, { Component, Fragment } from 'react';
import MyCalendar from './MyCalendar'
import { Box, Modal, Heading, Button } from 'gestalt';
import { addGooglePhotosScript } from '../scripts/logins';
import 'gestalt/dist/gestalt.css';
import { secrets } from '../scripts/secrets';

class Search extends Component {
    state = {
        fbLoggedIn: false,
        facebookPosts: [],
        dates: {
            start: "",
            end: ""
        }
    }

    handleDatesPicker = (date) => {
        // console.log(date)
        this.setState({
            dates: {
                start: date.start,
                end: date.end
            }
        })
    }

    async componentDidMount() {
        try {
            const params = {
                appId: secrets.FACEBOOK_APP_ID,
                cookie: false,
                xfbml: false,
                version: 'v3.2'
            };
            FB.init(params);
            FB.getLoginStatus(resp => {
                console.log('FB:status:', resp.status);
                if (resp.status === 'connected') {
                    this.setState({ fbLoggedIn: true })
                }
            });
            await addGooglePhotosScript();
            gapi.load('auth2', function () {
                const auth2 = gapi.auth2.init({
                    client_id: secrets.GAPI_CLIENT_ID,
                    fetch_basic_profile: false,
                    scope: 'profile'
                });
                console.log('is signed into gphotos: ', auth2.isSignedIn.get())
                // Sign the user in, and then retrieve their ID.
                // auth2.signIn().then(function() {
                //   console.log(auth2.currentUser.get().getId());
                // });
            });
        } catch (error) {
            console.log(error.name, ':', error.message);
        }
    }

    onClickSearch = () => {
        this.props.handleToggleLarge();
        const since = Math.floor(this.state.dates.start.getTime() / 1000);
        const until = Math.floor(this.state.dates.end.getTime() / 1000);
        // console.log(since, until)
        // FB.api(`/me?fields=posts.since(${since}).until(${until}){place,picture,full_picture,message,created_time,attachments{media,title,type,url,description}}`,
        //     (response) => {
        //         console.log(response)
        //         if (response && !response.error) {
        //             this.setState({
        //                 facebookPosts: response.posts.data,
        //             });
        //             this.props.handleFacebookPosts(this.state.facebookPosts);
        //         }
        //     }
        // );

        

    }

    render() {
        // console.log(this.wprops)
        return (
            <Fragment>
                <Box padding={1}>
                    {this.props.lg &&
                        <Modal
                            accessibilityCloseLabel="close"
                            accessibilityModalLabel="View default padding and styling"
                            heading="Search"
                            onDismiss={this.props.handleToggleLarge}
                            footer={
                                <Heading size="sm">
                                    <Box margin={-2}>
                                        <Box padding={2}>
                                            <Button color="red" text="SEARCH" type="submit"
                                                onClick={this.onClickSearch}
                                            />
                                        </Box>
                                    </Box>
                                </Heading>
                            }
                            size="lg">
                            <Box padding={2}>
                                <Heading size="sm">
                                    <MyCalendar
                                        datesPicker={this.handleDatesPicker}
                                    />
                                </Heading>
                            </Box>
                        </Modal>
                    }
                </Box>
            </Fragment>
        )
    }
}

export default Search;