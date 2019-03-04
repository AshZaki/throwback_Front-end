import React, { Component, Fragment } from 'react';
import { Box, IconButton, Flyout, Avatar, Text, Button, Divider, SearchField } from 'gestalt';
import 'gestalt/dist/gestalt.css';
import SocialTypeList from '../components/SocialTypeList';
import Search from '../components/Search'

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            isOpen: false,
            md: false,
            lg: false,
            open: false,
        };
        this.anchorRef = React.createRef();
        this.handleToggleMedium = this._handleToggleMedium.bind(this);
        this.handleToggleLarge = this._handleToggleLarge.bind(this);
        // this.handleClick = this._handleClick.bind(this);
        this.handleDismiss = this._handleDismiss.bind(this);
    }

    _handleToggleMedium() {
        this.setState(prevState => ({ 
            open: !this.state.open,
            md: !prevState.md, 
        }));
    }
    _handleToggleLarge() {
        this.setState(prevState => ({ 
            open: !this.state.open,
            lg: !prevState.lg 
        }));
    }
    // _handleClick() {
    //     this.setState(() => ({ open: !this.state.open }));
    // }
    _handleDismiss() {
        this.setState(() => ({ open: false }));
    }

    render() {
        let logout = () => { this.props.onLogOut() }
        // console.log(this.props.currentUser)
        return (
            <Fragment>

                <Box color="white" shape="rounded" padding={3} display="flex" direction="row" alignItems="center">
                    <Box padding={3}>
                        {/* <Icon
                                icon="pinterest"
                                color="red"
                                size={20}
                                accessibilityLabel="Pinterest"
                            /> */}
                    </Box>
                    <Box paddingX={2}>
                        <Button color="white"
                            text="Search"
                            onClick={this.handleToggleLarge}
                        />
                        <Search
                            lg={this.state.lg}
                            handleToggleLarge={this.handleToggleLarge}
                            handleFacebookPosts={this.props.handleFacebookPosts}
                        />
                    </Box>
                    
                    
                    <Avatar
                        size="sm"
                        src="/gestalt/static/media/keerthi.b283324e.jpg"
                        name={this.props.currentUser.first_name}
                    />
                    <Box padding={2} align="right">
                        <Text>{this.props.currentUser.first_name}</Text>
                    </Box>
                    
                   

                    <Box >
                        <Box display="inlineBlock" ref={this.anchorRef}>
                            <IconButton
                                accessibilityLabel="see more"
                                accessibilityHaspopup
                                accessibilityExpanded={this.state.isOpen}
                                icon="ellipsis"
                                onClick={() => this.setState({ isOpen: !this.state.isOpen })}
                            />
                        </Box>
                        {this.state.isOpen && (
                            <Flyout anchor={this.anchorRef.current} onDismiss={() => this.handleDismiss} idealDirection="down">
                                <Box color="white">
                                    <Box padding={2}>
                                        <Button color="white"
                                            text="Social Setting"
                                            onClick={this.handleToggleMedium}
                                        />
                                        <SocialTypeList
                                            md={this.state.md}
                                            handleToggleMedium={this.handleToggleMedium}
                                            addNewToken={this.props.addNewToken}
                                            currentUser={this.props.currentUser}
                                            onFacebookLoggedIn={this.props.onFacebookLoggedIn}
                                        />
                                    </Box>
                                    <Divider />
                                    <Box padding={2}>
                                        <Button onClick={logout} text="Logout" color="white" />
                                    </Box>
                                </Box>
                            </Flyout>
                        )}
                    </Box>
                </Box>
            </Fragment>
        )
    }
}

export default Navbar;