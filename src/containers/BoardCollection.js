import React, { Component, Fragment } from 'react';
import BoardList from '../components/BoardList'
import { Container, Box, IconButton, Modal, Button, Column, Label, Text, TextField, TextArea, Switch, Divider } from 'gestalt';
import 'gestalt/dist/gestalt.css';

class BoardCollection extends Component {

    constructor(props) {
        super(props);
        this.handleToggleModal = this._handleToggleModal.bind(this);
        this.state = {
            showModal: false,
            name: "",
            description: "",
        };
    }

    _handleToggleModal() {
        this.setState(prevState => ({ showModal: !prevState.showModal }));
    }

    onTypingNameChange = (e) => {
        // debugger
        this.setState({
            name: e.event.currentTarget.value,
        })
    }

    onTypingDesChange = (e) => {
        // debugger
        this.setState({
            description: e.event.currentTarget.value,
        })
    }
   
    handleSubmit = (e) => {
        // e.preventDefault()
        this.props.createNewBoard(this.state, this.props.currentUser)
        // e.target.reset()
    }

    render() {
        const { showModal } = this.state;
        return (
            <Fragment>
                <Box>
                    <Container>
                        <Box color="white" padding={1}>
                            <IconButton
                                accessibilityLabel="Add new board"
                                bgColor="transparent"
                                icon="add"
                                iconColor="gray"
                                onClick={this.handleToggleModal}
                            />
                            {showModal && (
                                <Modal
                                    accessibilityCloseLabel="close"
                                    accessibilityModalLabel="Edit Julia's board"
                                    heading="Create a new board"
                                    onDismiss={this.handleToggleModal}
                                    footer={
                                        <Box
                                            justifyContent="between"
                                            display="flex"
                                            direction="row"
                                            marginLeft={-1}
                                            marginRight={-1}>
                                            <Box column={6} paddingX={1}>
                                                <Box
                                                    display="flex"
                                                    direction="row"
                                                    justifyContent="end"
                                                    marginLeft={-1}
                                                    marginRight={-1}>
                                                    <Box paddingX={1}>
                                                        <Button text="Cancel" inline onClick={ this.handleToggleModal} />
                                                    </Box>
                                                    <Box paddingX={1}>
                                                        <Button color="red" inline text="Save" type="submit" onClick={this.handleSubmit}/>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Box>
                                    }
                                    size="md">
                                    <Box display="flex" direction="row" position="relative">
                                        <Column span={12}>
                                            <Box paddingY={2} paddingX={4} display="flex">
                                                <Column span={4}>
                                                    <Label htmlFor="name">
                                                        <Text align="left" bold>
                                                            Name
                                                        </Text>
                                                    </Label>
                                                </Column>
                                                <Column span={8}>
                                                    <TextField id="name"  onChange={this.onTypingNameChange} />
                                                </Column>
                                            </Box>
                                            <Divider />
                                            <Box paddingY={2} paddingX={4} display="flex">
                                                <Column span={4}>
                                                    <Label htmlFor="desc">
                                                        <Text align="left" bold>
                                                            Description
                                                        </Text>
                                                    </Label>
                                                </Column>
                                                <Column span={8}>
                                                    <TextArea id="desc" onChange={this.onTypingDesChange} />
                                                </Column>
                                            </Box>
                                        </Column>
                                    </Box>
                                </Modal>
                            )}
                        </Box>
                    </Container>
                </Box>
                <BoardList />
            </Fragment>
        )
    }
}

export default BoardCollection;