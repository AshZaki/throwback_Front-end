import React, { Component, Fragment } from 'react';
import {
    Box, Card, Image, Text, IconButton, Mask,
    Divider, Icon, Link, Layer, Toast
} from 'gestalt';
import 'gestalt/dist/gestalt.css';

class GooglePostsCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hovered: false,
            showLayer: false,
            showConfirmationToast: false,
        };
        this.handleMouseEnter = this._handleMouseEnter.bind(this);
        this.handleMouseLeave = this._handleMouseLeave.bind(this);
        this.handleConfirmationClick = this.handleConfirmationClick.bind(this);
        this.handleToggle = this._handleToggle.bind(this);
    }
    _handleMouseEnter() {
        this.setState(() => ({ hovered: true }));
    }
    _handleMouseLeave() {
        this.setState(() => ({ hovered: false }));
    }
    _handleToggle() {
        this.setState(prevState => ({ showLayer: !prevState.showLayer }));
    }
    handleConfirmationClick({ event }) {
        this.setState(prevState => ({ showConfirmationToast: !prevState.showConfirmationToast }));
    };

    onHandleClick = (e) => {
        // e.preventDefault
        this.props.handleGGCardClicked(this.props.post, this.props.googleUser)
        this.handleConfirmationClick(e)
    }

    render() {
        const { showLayer } = this.state;
        return (
            <Fragment>
                <Box maxWidth={500} column={12} padding={6} justifyContent="center" alignItems="center">
                    <Card
                        onMouseEnter={this.handleMouseEnter}
                        onMouseLeave={this.handleMouseLeave}>
                            <Mask shape="rounded">
                                <Image
                                    alt={this.props.post.id}
                                    color="rgb(255, 255, 255)"
                                    naturalHeight={500}
                                    naturalWidth={700}
                                    src={this.props.post.baseUrl}
                                    style="border-radius: 5px;"
                                />
                            </Mask>
                            <Box justifyContent="end" alignItems="center" display="flex">
                                <Box padding={1}>
                                    <IconButton
                                        accessibilityLabel="Love"
                                        bgColor="transparent"
                                        icon="heart"
                                        iconColor={this.state.showConfirmationToast ? "red" : "gray"}
                                        onClick={this.onHandleClick}
                                    />
                                </Box>
                                <Box padding={1}>
                                    <IconButton
                                        accessibilityLabel="Maximize"
                                        bgColor="transparent"
                                        icon="maximize"
                                        iconColor="gray"
                                        onClick={this.handleToggle}
                                    />
                                    {showLayer && (
                                        <Layer>
                                            <Box color="darkWash" position="fixed" top left right bottom display="flex" alignItems="center" justifyContent="center">
                                                <Box color="white" padding={3} alignItems="center">
                                                    <Box marginStart={2}>
                                                        <IconButton
                                                            accessibilityLabel="Close"
                                                            icon="cancel"
                                                            onClick={this.handleToggle}
                                                        />
                                                    </Box>
                                                    <Box>
                                                        <img
                                                            alt={this.props.post.id + ''}
                                                            src={this.props.post.baseUrl}
                                                        />
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Layer>
                                    )}
                                </Box>
                            </Box>
                    </Card>

                </Box>

            </Fragment>
        )
    }
}

export default GooglePostsCard;