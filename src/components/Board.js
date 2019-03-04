import React, { Component, Fragment } from 'react';
import { Box, Card, IconButton, Text, Link, Button } from 'gestalt';
import 'gestalt/dist/gestalt.css';

class Board extends Component {
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
                <Box maxWidth={236} padding={2} column={12}>
                    <Card
                        // image={
                        //     <Avatar
                        //         name="James Jones"
                        //         src="/gestalt/static/media/james.04b042a6.jpg"
                        //     />
                        // }
                        onMouseEnter={this.handleMouseEnter}
                        onMouseLeave={this.handleMouseLeave}>
                        <Text align="center" bold size="xl">
                            <Box paddingX={3} paddingY={2}>
                                {this.props.board.name}
                            </Box>
                        </Text>
                        <Text align="center" bold size="sm">
                            <Box paddingX={3} paddingY={2}>
                                {this.props.board.description}
                            </Box>
                        </Text>
                        <Box alignItems="center" display="flex">
                            <Box padding={1}>
                                <IconButton
                                    accessibilityLabel="Edit"
                                    bgColor="transparent"
                                    icon="edit"
                                    iconColor="gray"
                                    // onClick={}
                                />
                            </Box>
                            <Box padding={1}>
                                <IconButton
                                    accessibilityLabel="Delete"
                                    bgColor="transparent"
                                    icon="trash-can"
                                    iconColor="gray"
                                    onClick={()=> this.props.handleDeleteBoard(this.props.board.id)}
                                /> 
                            </Box>
                        </Box>
                            
                    </Card>
                </Box>
            </Fragment>
        )
    }
}

export default Board;