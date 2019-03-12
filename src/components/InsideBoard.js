import React, { Component, Fragment } from 'react'
import { Box, Button, Card, showLayer, IconButton, Image, Label, Mask, Modal, Text, TextArea, TextField, Flyout, Layer } from 'gestalt';
import 'gestalt/dist/gestalt.css';


class InsideBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hovered: false,
            showLayer: false,
           
        };
        this.handleMouseEnter = this._handleMouseEnter.bind(this);
        this.handleMouseLeave = this._handleMouseLeave.bind(this);
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

    render() {
        const { showLayer } = this.state;
        return (
            <Fragment>
                <Box maxWidth={800} column={12} padding={6} justifyContent="center" alignItems="center">
                    <Card
                        onMouseEnter={this.handleMouseEnter}
                        onMouseLeave={this.handleMouseLeave}>
                        <Mask shape="rounded">
                            <Image
                                alt={this.props.post.id + ""}
                                color="rgb(255, 255, 255)"
                                naturalHeight={500}
                                naturalWidth={700}
                                src={this.props.post.full_picture}
                                style="border-radius: 5px;"
                            />
                        </Mask>
                        <Box justifyContent="end" alignItems="center" display="flex">
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
                                                        src={this.props.post.full_picture}
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

export default InsideBoard



