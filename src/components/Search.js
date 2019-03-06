/*global FB*/
/*global gapi*/
/*global auth2*/
import React, { Component, Fragment } from 'react';
import MyCalendar from './MyCalendar'
import ShowPostFromApi from '../containers/ShowPostFromApi'
import { Box, Modal, Heading, Button, Column } from 'gestalt';
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
            await addGooglePhotosScript(secrets.GAPI_CLIENT_ID);
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

        // google photos:
        // gapi.client.photoslibrary.mediaItems.search({
        //     "resource": {
        //         "filters": {
        //             "dateFilter": {
        //                 "ranges": [
        //                     {
        //                         "startDate": {
        //                             "day": 1,
        //                             "month": 1,
        //                             "year": 2017
        //                         },
        //                         "endDate": {
        //                             "day": 3,
        //                             "month": 3,
        //                             "year": 2017
        //                         }
        //                     }
        //                 ]
        //             }
        //         }
        //     }
        // })
        // .then(function (response) {
        //     // Handle the results here (response.result has the parsed body).
        //     console.log("Response", response);
        // },
        //     function (err) { console.error("Execute error", err); });



        // fb
        const since = Math.floor(this.state.dates.start.getTime() / 1000);
        const until = Math.floor(this.state.dates.end.getTime() / 1000);
        // console.log(since, until)
        FB.api(`/me?fields=posts.since(${since}).until(${until}){place,picture,full_picture,message,created_time,attachments{media,title,type,url,description}}`,
            (response) => {
                console.log(response)
                if (response && !response.error) {
                    this.setState({
                        facebookPosts: response.posts.data,
                    });
                    this.props.handleFacebookPosts(this.state.facebookPosts);
                }
            }
        );




    }

    render() {
        console.log(this.props)
        return (
            <Fragment>
                <Box justifyContent="center" alignItems="center" padding={1} marginBottom={4}>
                    <MyCalendar
                        datesPicker={this.handleDatesPicker}
                    />
                </Box>
                <Box display="flex" direction="row" paddingY={2}>
                    <Column span={5}>

                    </Column>
                    <Column span={2}>
                        <Box color="white" padding={1}>
                            <Button color="red" text="SEARCH" type="submit"
                                onClick={this.onClickSearch}
                            />
                        </Box>
                    </Column>
                    {/* <Column span={4}>
                        <Box color="lightGray" padding={1}>
                            <Box color="white" paddingY={2}>
                                <Text align="center">4</Text>
                            </Box>
                        </Box>
                    </Column> */}
                </Box>
                <Box>
                    <ShowPostFromApi
                        facebookPosts={this.props.facebookPosts}
                        facebookUser={this.props.facebookUser}
                        handleFBCardClicked={this.props.handleFBCardClicked}
                    />
                </Box>
            </Fragment>
        )
    }
}

export default Search;