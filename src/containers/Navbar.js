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
        // this.handleClick = this._handleClick.bind(this);
        this.handleDismiss = this._handleDismiss.bind(this);
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
                <Box shape="rounded" padding={3} display="flex" direction="row" justifyContent="end" alignItems="center">
                    <Box paddingX={1}>
                        <Avatar
                            size="md"
                            src={require(`../Ash.jpg`)}
                            name={this.props.currentUser.first_name}
                        />
                    </Box>
                    <Box padding={2} align="right">
                        <Text bold size="md">{this.props.currentUser.first_name}</Text>
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