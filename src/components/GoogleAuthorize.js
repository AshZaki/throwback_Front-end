/*global gapi*/
/*global auth2*/
import React, { Component, Fragment } from 'react';
import { addGooglePhotosScript } from '../scripts/logins';
import { secrets } from '../scripts/secrets';
import { Switch, Box, Icon, Button } from 'gestalt';
import 'gestalt/dist/gestalt.css';

class GoogleAuthorize extends Component {

    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        try {
            await addGooglePhotosScript(secrets.GAPI_CLIENT_ID);
            gapi.load('client:auth2', function() {
                console.log('Google Photos signed in: ' + gapi.auth2.getAuthInstance().isSignedIn.get());

              });

        } catch (error) {
            console.log(error.name, ':', error.message);
        }
    }

    handleClick = () => {
        function authenticate() {
            return gapi.auth2.getAuthInstance()
                .signIn({ scope: "https://www.googleapis.com/auth/photoslibrary https://www.googleapis.com/auth/photoslibrary.readonly https://www.googleapis.com/auth/photoslibrary.readonly.appcreateddata" })
                .then(function () { console.log("Sign-in successful"); },
                    function (err) { console.error("Error signing in", err); });
        }
        function loadClient() {
            return gapi.client.load("https://content.googleapis.com/discovery/v1/apis/photoslibrary/v1/rest")
                .then(function () { console.log("GAPI client loaded for API"); },
                    function (err) { console.error("Error loading GAPI client for API", err); })
                    .then(()=> {
                        gapi.client.photoslibrary.mediaItems.search({
                            "resource": {
                                "filters": {
                                    "dateFilter": {
                                        "ranges": [
                                            {
                                                "startDate": {
                                                    "day": 1,
                                                    "month": 1,
                                                    "year": 2017
                                                },
                                                "endDate": {
                                                    "day": 3,
                                                    "month": 3,
                                                    "year": 2017
                                                }
                                            }
                                        ]
                                    }
                                }
                            }
                        })
                        .then(function (response) {
                            // Handle the results here (response.result has the parsed body).
                            console.log("Response", response);
                        },
                        function (err) { console.error("Execute error", err); });
                    });
        }

        authenticate().then(loadClient);
    }

    render() {
        return (
            <Fragment>
                {/* <Box>
                    <Switch
                        onChange={this.handleChange}
                        onClick={this.handleClick}
                        id="emailNotifications"
                        switched={this.state.switched}
                    />
                </Box> */}
                {/* <Box padding={2}
                    onClick={this.handleClick}>
                        <Button accessibilityLabel="ConnectFB" text="Connect" />
                </Box> */}
                <button
                    type="button"
                    className="btn"
                    onClick={this.handleClick}>
                    Google
                </button>

            </Fragment>
        )
    }

}

export default GoogleAuthorize;