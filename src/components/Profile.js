import React, { Component, Fragment } from 'react';
import { Box, Text, Avatar, Column, Heading,IconButton,Container } from 'gestalt';
import 'gestalt/dist/gestalt.css';

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
                    <Column span={4}>
                        <Box color="white" padding={1}>
                            <Box color="white" paddingY={2}>
                                <Text align="center"></Text>
                            </Box>
                        </Box>
                    </Column>
                    <Column span={1}>
                        <Box color="white" padding={1}>
                            <Box color="white" paddingY={2}>
                                {/* <Avatar align="center"
                                    size="lg"
                                    src="/gestalt/static/media/keerthi.b283324e.jpg"
                                    name={this.props.loginUser.first_name}
                                /> */}
                            </Box>
                        </Box>
                    </Column>
                    <Column span={4}>
                        <Box color="white" padding={1}>
                            <Box color="white" paddingY={2}>
                                <Heading size="sm">{this.props.loginUser.first_name} {this.props.loginUser.last_name}</Heading>
                            </Box>
                            <Container>
                                <Box direction="row" paddingY={2} display="flex">
                                    <Box paddingX={1}>
                                        <IconButton
                                            accessibilityLabel="Facebook"
                                            bgColor="transparentDarkGray"
                                            icon="facebook"
                                            iconColor="gray"
                                            // onClick={}
                                        /> 
                                    </Box>
                                    <Box paddingX={1}>
                                        <IconButton
                                            accessibilityLabel="Instagram"
                                            bgColor="transparentDarkGray"
                                            icon="share"
                                            iconColor="gray"
                                            // onClick={}
                                        /> 
                                    </Box>
                                    <Box paddingX={1}>
                                        <IconButton
                                            accessibilityLabel="Twitter"
                                            bgColor="transparentDarkGray"
                                            icon="twitter"
                                            iconColor="gray"
                                            // onClick={}
                                        /> 
                                    </Box>
                                    <Box paddingX={1}>
                                        <IconButton
                                            accessibilityLabel="Google Photo"
                                            bgColor="transparentDarkGray"
                                            icon="share"
                                            iconColor="gray"
                                            // onClick={}
                                        /> 
                                    </Box>
                                    <Box paddingX={1}>
                                        <IconButton
                                            accessibilityLabel="Pinterest"
                                            bgColor="transparentDarkGray"
                                            icon="pinterest"
                                            iconColor="gray"
                                            // onClick={}
                                        /> 
                                    </Box>
                                </Box>
                            </Container>
                        </Box>
                    </Column>
                    <Column span={3}>
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