/*global gapi*/
/*global auth2*/
import React, { Component, Fragment } from 'react';
import { addGooglePhotosScript } from '../scripts/logins';
import { secrets } from '../scripts/secrets';
import { IconButton } from 'gestalt';
import 'gestalt/dist/gestalt.css';

class GoogleAuthorize extends Component {

    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        try {
            await addGooglePhotosScript(secrets.GAPI_CLIENT_ID);
        } catch (error) {
            console.log(error.name, ':', error.message);
        }
    }

    handleClick = () => {
        gapi.auth2.getAuthInstance()
            .signIn({ scope: "https://www.googleapis.com/auth/photoslibrary https://www.googleapis.com/auth/photoslibrary.readonly https://www.googleapis.com/auth/photoslibrary.readonly.appcreateddata" })
            .then(response => {
                // debugger;
                // response.getId()
                console.log("Sign-in successful", response)
            },
                       err => console.error("Error signing in", err))
            .then(_ => {
                gapi.client.load("https://content.googleapis.com/discovery/v1/apis/photoslibrary/v1/rest")
                    .then(_ => console.log("GAPI client loaded for API"),
                               err => console.error("Error loading GAPI client for API", err))
            })
    }

    render() {
        return (
            <Fragment>
                <IconButton
                    accessibilityLabel="Google Phpto"
                    bgColor="transparent"
                    icon="google-plus"
                    iconColor="gray"
                    onClick={this.handleClick}
                />
            </Fragment>
        )
    }

}

export default GoogleAuthorize;