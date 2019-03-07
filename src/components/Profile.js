import React, { Component, Fragment } from 'react';
import { Box, Text, Avatar, Column, Heading,IconButton,Container } from 'gestalt';
import 'gestalt/dist/gestalt.css';
import FacebookAuthorize from './FacebookAuthorize'
import GoogleAuthorize from './GoogleAuthorize'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFacebookF, faInstagram, faTwitter, faGoogle, faPinterest } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
library.add(faFacebookF, faInstagram, faTwitter, faGoogle, faPinterest)


class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0
        };
        this.handleChange = this._handleChange.bind(this);
    }

    _handleChange({ activeTabIndex, event }) {
        event.preventDefault();
        this.setState({
            activeIndex: activeTabIndex
        });
    }

    render() {
        // console.log(this.props)
        return (
            <Fragment>
                <Box display="flex" direction="row" paddingY={2}>
                    <Column span={5}>
                        <Box color="white" padding={1}>
                            <Box color="white" paddingY={2}>
                                <Text align="center"></Text>
                            </Box>
                        </Box>
                    </Column>
                    <Column span={2}>
                        <Box color="white" padding={1} justifyContent="center" alignItems="center">
                            {/* <Box color="white" paddingY={2}>
                                <Heading size="sm">{this.props.loginUser.first_name} {this.props.loginUser.last_name}</Heading>
                            </Box> */}
                            <Container>
                                <Box direction="row" paddingY={2} display="flex">
                                    <Box paddingX={1}>
                                        <FacebookAuthorize
                                            currentUser={this.props.loginUser}
                                            onSuccess={this.props.onSuccess}
                                            handleFacebookPosts={this.props.handleFacebookPosts}
                                            isFacebookLoggedIn={this.props.isFacebookLoggedIn}
                                        />
                                    </Box>
                                    <Box paddingX={1}>
                                        <IconButton
                                            accessibilityLabel="Twitter"
                                            bgColor="transparent"
                                            icon="twitter"
                                            iconColor="gray"
                                            // onClick={}
                                        /> 
                                    </Box>
                                    <Box paddingX={1}>
                                        <GoogleAuthorize
                                            currentUser={this.props.loginUser}
                                            onGGSuccess={this.props.onGGSuccess}
                                            isGooglePhotosLoggedIn={this.props.isGooglePhotosLoggedIn}
                                        />
                                    </Box>
                                    <Box paddingX={1}>
                                        <IconButton
                                            accessibilityLabel="Pinterest"
                                            bgColor="transparent"
                                            icon="pinterest"
                                            iconColor="gray"
                                            // onClick={}
                                        /> 
                                    </Box>
                                </Box>
                            </Container>
                        </Box>
                    </Column>
                    <Column span={5}>
                        <Box color="white" padding={1}>
                            <Box color="white" paddingY={2}>
                                
                            </Box>
                        </Box>
                    </Column>
                </Box>
            </Fragment>
        )
    }
}

export default Profile;