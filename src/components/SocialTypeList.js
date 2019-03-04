import React, { Component, Fragment } from 'react';
import FacebookAuthorize from '../components/FacebookAuthorize'
import GoogleAuthorize from '../components/GoogleAuthorize'
import Instagram from '../components/InstagramAuthorize'
import Twitter from '../components/TwitterAuthorize'
import { Box, Modal, Heading, Divider, Column, Switch } from 'gestalt';
import 'gestalt/dist/gestalt.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFacebookF, faInstagram, faTwitter, faGoogle, faPinterest } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
library.add(faFacebookF, faInstagram, faTwitter, faGoogle, faPinterest)


class SocialTypeList extends Component {

    state = {
        switchedIG: false,
        switchedTW: false,
        switchedPin: false,
        switchedGoogle: false
    }
    render() {
        // console.log(this.props)
        return (
            <Fragment>
                {/* <Box padding={1}> */}
                    {this.props.md &&
                        <Modal
                            accessibilityCloseLabel="close"
                            accessibilityModalLabel="View default padding and styling"
                            heading="Social Accounts Setting"
                            onDismiss={this.props.handleToggleMedium}
                            size="md">
                            <Box padding={2}>
                                <Heading size="sm">
                                    <Box color="white">
                                        <Box padding={2} display="flex" direction="row">
                                            <Column span={2}>
                                                <Box color="white" padding={1}>
                                                    <Box color="white" paddingY={1}>
                                                        <FontAwesomeIcon icon={['fab', 'facebook-f']} />
                                                    </Box>
                                                </Box>
                                            </Column>
                                            <Column span={8}>
                                                <Box color="white" padding={1}>
                                                    <Box color="white" paddingY={2}>
                                                        <Heading size="xs" bold>Facebook</Heading>
                                                    </Box>
                                                </Box>
                                            </Column>
                                            <Column span={2}>
                                                <Box color="white" padding={1}>
                                                    <Box color="white" paddingY={2}>
                                                        <FacebookAuthorize
                                                            // addNewToken={this.props.addNewToken}
                                                            // currentUser={this.props.currentUser}
                                                            currentUser={this.props.currentUser}
                                                            onSuccess={this.props.onFacebookLoggedIn}
                                                            handleFacebookPosts={this.props.handleFacebookPosts}
                                                        />
                                                    </Box>
                                                </Box>
                                            </Column>
                                        </Box>
                                        <Divider />
                                        <Box padding={2} display="flex" direction="row">
                                            <Column span={2}>
                                                <Box color="white" padding={1}>
                                                    <Box color="white" paddingY={1}>
                                                        <FontAwesomeIcon icon={['fab', 'instagram']} />
                                                    </Box>
                                                </Box>
                                            </Column>
                                            <Column span={9}>
                                                <Box color="white" padding={1}>
                                                    <Box color="white" paddingY={2}>
                                                        <Heading size="xs" bold>Instagram</Heading>
                                                    </Box>
                                                </Box>
                                            </Column>
                                            <Column span={2}>
                                                <Box color="white" padding={1}>
                                                    <Box color="white" paddingY={2}>
                                                        <Instagram />
                                                        <Switch
                                                            onChange={() => this.setState({ switchedIG: !this.state.switchedIG })}
                                                            id="switchExample"
                                                            switched={this.state.switchedIG}
                                                        />
                                                    </Box>
                                                </Box>
                                            </Column>
                                        </Box>
                                        <Divider />
                                        <Box padding={2} display="flex" direction="row">
                                            <Column span={2}>
                                                <Box color="white" padding={1}>
                                                    <Box color="white" paddingY={1}>
                                                        <FontAwesomeIcon icon={['fab', 'twitter']} />
                                                    </Box>
                                                </Box>
                                            </Column>
                                            <Column span={9}>
                                                <Box color="white" padding={1}>
                                                    <Box color="white" paddingY={2}>
                                                        <Heading size="xs" bold>Twitter</Heading>
                                                    </Box>
                                                </Box>
                                            </Column>
                                            <Column span={2}>
                                                <Box color="white" padding={1}>
                                                    <Box color="white" paddingY={2}>
                                                        <Twitter />
                                                        <Switch
                                                            onChange={() => this.setState({ switchedTW: !this.state.switchedTW })}
                                                            id="switchExample"
                                                            switched={this.state.switchedTW}
                                                        />
                                                    </Box>
                                                </Box>
                                            </Column>
                                        </Box>
                                        <Divider />
                                        <Box padding={2} display="flex" direction="row">
                                            <Column span={2}>
                                                <Box color="white" padding={1}>
                                                    <Box color="white" paddingY={1}>
                                                        <FontAwesomeIcon icon={['fab', 'pinterest']} />
                                                    </Box>
                                                </Box>
                                            </Column>
                                            <Column span={9}>
                                                <Box color="white" padding={1}>
                                                    <Box color="white" paddingY={2}>
                                                        <Heading size="xs" bold>Pinterest</Heading>
                                                    </Box>
                                                </Box>
                                            </Column>
                                            <Column span={2}>
                                                <Box color="white" padding={1}>
                                                    <Box color="white" paddingY={2}>
                                                        {/* <Pinterest /> */}
                                                        <Switch
                                                            onChange={() => this.setState({ switchedPin: !this.state.switchedPin })}
                                                            id="switchExample"
                                                            switched={this.state.switchedPin}
                                                        />
                                                    </Box>
                                                </Box>
                                            </Column>
                                        </Box>
                                        <Divider />
                                        <Box padding={2} display="flex" direction="row">
                                            <Column span={2}>
                                                <Box color="white" padding={1}>
                                                    <Box color="white" paddingY={1}>
                                                        <FontAwesomeIcon icon={['fab', 'google']} />
                                                    </Box>
                                                </Box>
                                            </Column>
                                            <Column span={9}>
                                                <Box color="white" padding={1}>
                                                    <Box color="white" paddingY={2}>
                                                        <Heading size="xs" bold>Google Photo</Heading>
                                                    </Box>
                                                </Box>
                                            </Column>
                                            <Column span={2}>
                                                <Box color="white" padding={1}>
                                                    <Box color="white" paddingY={2}>
                                                        {/* <Google /> */}
                                                        {/* <Switch
                                                            onChange={() => this.setState({ switchedGoogle: !this.state.switchedGoogle })}
                                                            id="switchExample"
                                                            switched={this.state.switchedGoogle}
                                                        /> */}
                                                        <GoogleAuthorize
                                                            // addNewToken={this.props.addNewToken}
                                                            // currentUser={this.props.currentUser}
                                                            // currentUser={this.props.currentUser}
                                                            // onSuccess={this.props.onFacebookLoggedIn}
                                                            // handleFacebookPosts={this.props.handleFacebookPosts}
                                                        />
                                                    </Box>
                                                </Box>
                                            </Column>
                                        </Box>
                                    </Box>
                                </Heading>
                            </Box>
                        </Modal>
                    }
                {/* </Box> */}

            </Fragment>
        )
    }
}

export default SocialTypeList;