import React, { Component, Fragment } from 'react'
import { Box, Card, Avatar, Text, Link, Button, Column, Label, TextField, TextArea, Divider } from 'gestalt';
import 'gestalt/dist/gestalt.css';

class FavoritesMapCard extends Component {
    handleClick = (e) => {
		this.props.toggleShowPage(this.props.favorite)
	}
    render() {
        // console.log(this.props)
        return (
            <Fragment>
                <Box maxWidth={236} padding={2} column={12}>
                    <Card
                        image={
                            <Avatar size="md"
                                name="James Jones"
                                src={this.props.favorite.full_picture}
                            />
                        }
                        onMouseEnter={this.handleMouseEnter}
                        onMouseLeave={this.handleMouseLeave}
                        >
                        <Text align="center" bold size="sm">
                            <Box paddingX={3} paddingY={2}>
                                {this.props.favorite.place_name}
                            </Box>
                        </Text>
                    </Card>
                </Box>
            </Fragment>
        )
    }
}

export default FavoritesMapCard;