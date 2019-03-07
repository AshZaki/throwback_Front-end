/*global FB*/
import React, { Component, Fragment } from 'react';
import { Box, Card, Text, Mask, Image, IconButton, Divider, Icon, Layer} from 'gestalt';
import 'gestalt/dist/gestalt.css';

class LikeCard extends Component {
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
                {this.props.card.place_name ?
                <Box maxWidth={350} padding={2} column={12}>
                    {this.props.card.full_picture ?
                        <Card
                            onMouseEnter={this.handleMouseEnter}
                            onMouseLeave={this.handleMouseLeave}
                        >
                            <Mask shape="rounded">
                                <Image
                                    alt={this.props.card.id + ''}
                                    color="rgb(255, 255, 255)"
                                    naturalHeight={500}
                                    naturalWidth={700}
                                    src={this.props.card.full_picture}
                                    style="border-radius: 5px;"
                                />
                            </Mask>
                            <Box>
                                <Text>
                                    <Box paddingX={3} paddingY={2}>
                                        {this.props.card.message}
                                    </Box>
                                </Text>
                                <Divider />
                                {this.props.card.place_name ?
                                <Box alignItems="end" display="flex">
                                    <Box marginRight={1} padding={1}>
                                        <Icon icon="location" accessibilityLabel="Location" color="darkGray" />
                                    </Box>
                                    <Text bold size="sm" color="darkGray">
                                        {this.props.card.place_name}
                                    </Text>
                                </Box>
                                : null}
                            </Box> 
                            <Box justifyContent="end" alignItems="center" display="flex">
                                <Box padding={1}>
                                    <IconButton
                                        accessibilityLabel="Delete"
                                        bgColor="transparent"
                                        icon="trash-can"
                                        iconColor="gray"
                                        onClick={e => this.props.handleDeleteCard(this.props.card.id, this.props.facebookUser)}
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
                                                            alt={this.props.card.id+''}
                                                            src={this.props.card.full_picture}
                                                        />  
                                                    </Box>    
                                                </Box>
                                            </Box>
                                        </Layer>
                                    )}
                                </Box>
                            </Box>
                        </Card>
                        :
                        <Card
                            onMouseEnter={this.handleMouseEnter}
                            onMouseLeave={this.handleMouseLeave}
                        >
                            <Text align="center" bold size="sm">
                                <Box paddingX={3} paddingY={2}>
                                    {this.props.card.message}
                                </Box>
                            </Text>
                            <Box justifyContent="end" alignItems="center" display="flex">
                                <Box padding={1}>
                                    <IconButton
                                        accessibilityLabel="Delete"
                                        bgColor="transparentDarkGray"
                                        icon="trash-can"
                                        iconColor="gray"
                                        onClick={e => this.props.handleDeleteCard(this.props.card.id, this.props.facebookUser)}
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
                                                            alt={this.props.card.id+''}
                                                            src={this.props.card.full_picture}
                                                        />  
                                                    </Box>    
                                                </Box>
                                            </Box>
                                        </Layer>
                                    )}
                                </Box>

                            </Box>
                        </Card>
                    }
                </Box>
                :
                 <Box maxWidth={350} padding={2} column={12}>
                    {this.props.card.full_picture ?
                        <Card
                            onMouseEnter={this.handleMouseEnter}
                            onMouseLeave={this.handleMouseLeave}
                        >
                            <Mask shape="rounded">
                                <Image
                                    alt={this.props.card.id + ''}
                                    color="rgb(255, 255, 255)"
                                    naturalHeight={500}
                                    naturalWidth={700}
                                    src={this.props.card.full_picture}
                                    style="border-radius: 5px;"
                                />
                            </Mask>
                            <Box>
                                <Text>
                                    <Box paddingX={3} paddingY={2}>
                                        {this.props.card.message}
                                    </Box>
                                </Text>
                                <Divider />
                                <Box alignItems="end" display="flex">
                                    <Box marginRight={1} padding={1}>
                                        <Icon icon="location" accessibilityLabel="Location" color="darkGray" />
                                    </Box>
                                </Box>
                            </Box>
                            <Box justifyContent="end" alignItems="center" display="flex">
                                <Box padding={1}>
                                    <IconButton
                                        accessibilityLabel="Delete"
                                        bgColor="transparent"
                                        icon="trash-can"
                                        iconColor="gray"
                                        onClick={e => this.props.handleDeleteCard(this.props.card.id, this.props.facebookUser)}
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
                                                            alt={this.props.card.id+''}
                                                            src={this.props.card.full_picture}
                                                        />  
                                                    </Box>    
                                                </Box>
                                            </Box>
                                        </Layer>
                                    )}
                                </Box>
                            </Box>
                        </Card>
                        :
                        <Card
                            onMouseEnter={this.handleMouseEnter}
                            onMouseLeave={this.handleMouseLeave}>
                            <Text align="center" bold size="sm">
                                <Box paddingX={3} paddingY={2}>
                                    {this.props.card.message}
                                </Box>
                            </Text>
                            <Box justifyContent="end" alignItems="center" display="flex">
                                <Box padding={1}>
                                    <IconButton
                                        accessibilityLabel="Delete"
                                        bgColor="transparentDarkGray"
                                        icon="trash-can"
                                        iconColor="gray"
                                        onClick={e => this.props.handleDeleteCard(this.props.card.id, this.props.facebookUser)}
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
                                                            alt={this.props.card.id+''}
                                                            src={this.props.card.full_picture}
                                                        />  
                                                    </Box>    
                                                </Box>
                                            </Box>
                                        </Layer>
                                    )}
                                </Box>

                            </Box>
                        </Card>
                    }
                </Box>
                }
            </Fragment>
        )
    }
}

export default LikeCard;