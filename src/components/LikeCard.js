/*global FB*/
import React, { Component, Fragment } from 'react';
import { Box, Card, Text, Mask, Image, IconButton } from 'gestalt';
import 'gestalt/dist/gestalt.css';

class LikeCard extends Component {
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
        return (
            <Fragment>
                <Box maxWidth={236} padding={2} column={12}>
                    {this.props.card.full_picture ?
                    <Card
                        onMouseEnter={this.handleMouseEnter}
                        onMouseLeave={this.handleMouseLeave}>
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
                        <Text align="center" bold size="sm">
                            <Box paddingX={3} paddingY={2}>
                                {this.props.card.message}
                            </Box>
                        </Text>
                        {this.state.hovered ?
                        <Box alignItems="center" display="flex">
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
                                    accessibilityLabel="Share"
                                    bgColor="transparent"
                                    icon="share"
                                    iconColor="gray"
                                    // onClick={}
                                /> 
                            </Box>    
                        </Box>: null }
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
                    {this.state.hovered ?
                    <Box alignItems="center" display="flex">
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
                                accessibilityLabel="Share"
                                bgColor="transparentDarkGray"
                                icon="share"
                                iconColor="gray"
                                // onClick={}
                            /> 
                        </Box>
                        
                    </Box>: null }
                    </Card> }
                </Box>
            </Fragment>
        )
    }
}

export default LikeCard;