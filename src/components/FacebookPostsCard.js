import React, { Component, Fragment } from 'react';
import { Box, Card, Image, Text, IconButton, Mask } from 'gestalt';
import 'gestalt/dist/gestalt.css';


class FacebookPostsCard extends Component {

    constructor(props) {
        super(props);
        this.state = { hovered: false };
        this.handleMouseEnter = this._handleMouseEnter.bind(this);
        this.handleMouseLeave = this._handleMouseLeave.bind(this);
    }
    _handleMouseEnter() {
        this.setState(() => ({ hovered: true }));
    }
    _handleMouseLeave() {
        this.setState(() => ({ hovered: false }));
    }

    render() {
        console.log(this.props)
        return (
            <Fragment>
                -Facebook-
                <Box maxWidth={500} column={12} >
                    {this.props.post.full_picture ?
                        <Card
                            onMouseEnter={this.handleMouseEnter}
                            onMouseLeave={this.handleMouseLeave}
                        >
                            <Mask shape="rounded">
                                <Image
                                    alt={this.props.post.id}
                                    color="rgb(255, 255, 255)"
                                    naturalHeight={500}
                                    naturalWidth={700}
                                    src={this.props.post.full_picture}
                                    style="border-radius: 5px;"
                                />
                            </Mask>

                            <Text>
                                <Box paddingX={3} paddingY={2}>
                                    {this.props.post.message}
                                    {this.props.post.created_time}
                                </Box>
                                <Box paddingX={3} paddingY={2}>
                                    {/* {this.props.data.place.map(place => place.name)} */}
                                </Box>
                            </Text>
                            {this.state.hovered ?
                                <IconButton
                                    accessibilityLabel="Love"
                                    bgColor="transparentDarkGray"
                                    icon="heart"
                                    iconColor="red"
                                    onClick={e => this.props.handleFBCardClicked(this.props.post, this.props.facebookUser)}
                                />
                                : null}
                        </Card>
                        :

                        <Card
                            onMouseEnter={this.handleMouseEnter}
                            onMouseLeave={this.handleMouseLeave}>
                            <Text>
                                <Box paddingX={3} paddingY={2}>
                                    {this.props.post.message}
                                </Box>
                            </Text>
                            {this.state.hovered ?
                                <IconButton
                                    accessibilityLabel="Love"
                                    bgColor="transparentDarkGray"
                                    icon="heart"
                                    iconColor="red"
                                    onClick={e => this.props.handleFBCardClicked(this.props.post, this.props.facebookUser)}
                                />
                                : null}
                        </Card>
                    }
                </Box>
            </Fragment>
        )
    }
}

export default FacebookPostsCard;