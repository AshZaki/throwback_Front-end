/*global FB*/
import React, { Component, Fragment } from 'react';
import { addFacebookScript } from '../scripts/logins';
import { Switch, Box, Icon, Button, IconButton } from 'gestalt';
import 'gestalt/dist/gestalt.css';
import { secrets } from '../scripts/secrets';

class FacebookAuthorize extends Component {

    state ={
        clicked: false
    }
    async componentDidMount() {
        try {
            await addFacebookScript();
            const params = {
                appId: secrets.FACEBOOK_APP_ID,
                cookie: false,
                xfbml: false,
                version: 'v3.2'
            };
            FB.init(params);
            FB.getLoginStatus(resp => {
                console.log('FB:status:', resp.status);
            });
        } catch (error) {
            console.log(error.name, ':', error.message);
        }
    }

    handleClick = () => {
        const { loading, onSuccess } = this.props;
        if (loading) {
            return;
        }

        FB.getLoginStatus((resp) => {
            // console.log(resp)
            console.log('FB:status:', resp.status);
            const params = {
                provider: 'facebook'
            };

            if (resp.status === 'connected') {
                params.fbAccessToken = resp.authResponse.accessToken;

                FB.api('/me', (response) => {
                    // console.log(response)
                });
                onSuccess(params, this.props.currentUser);
                return;
            }

            FB.login((resp) => {
                // console.log('FB:status:', resp.status);
                if (resp.authResponse) {
                    FB.api('/me', (response) => {
                        // console.log(response)
                        // console.log('Good to see you, ' + response.name + '.');
                        this.setState({
                            clicked: true
                        })
                    });
                    params.fbAccessToken = resp.authResponse.accessToken;
                    onSuccess(this.state, this.props.currentUser);
                }
            }, { scope: 'email' });
        });
    }

    render() {
        return (
            <Fragment>
                <IconButton
                    accessibilityLabel="Facebook"
                    bgColor="transparent"
                    icon="facebook"
                    iconColor="gray"
                    onClick={this.handleClick}
                />
            </Fragment>
        )
    }

}

export default FacebookAuthorize;