import React, { Component, Fragment } from 'react';
import { Box, IconButton, Flyout, Avatar, Text, Button, Divider, SearchField } from 'gestalt';
import 'gestalt/dist/gestalt.css';
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
        this.handleToggleLarge = this._handleToggleLarge.bind(this);
        // this.handleClick = this._handleClick.bind(this);
        this.handleDismiss = this._handleDismiss.bind(this);
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
                    <Box paddingX={1}>
                        <Avatar
                            size="sm"
                            src="/gestalt/static/media/keerthi.b283324e.jpg"
                            name={this.props.currentUser.first_name}
                        />
                    </Box>
                    <Box padding={2} align="right">
                        <Text>{this.props.currentUser.first_name}</Text>
                    </Box>
                    
                    <Box paddingX={1}>
                        <IconButton
                            accessibilityLabel="Logout"
                            bgColor="transparent"
                            icon="logout"
                            iconColor="gray"
                            onClick={logout}
                        /> 
                    </Box>         
                </Box>
            </Fragment>
        )
    }
}

export default Navbar;