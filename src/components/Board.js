import React, { Component, Fragment } from 'react';
import { Box, Button, Card, Collage, Column, Divider, IconButton, Image, Label, Mask, Modal, Text, TextArea, TextField, Flyout } from 'gestalt';
import 'gestalt/dist/gestalt.css';

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            hovered: false,
            showModal: false,
            name: "",
            description: "",
        };
        this.anchorRef = React.createRef();
        this.handleMouseEnter = this._handleMouseEnter.bind(this);
        this.handleMouseLeave = this._handleMouseLeave.bind(this);
        this.handleToggleModal = this._handleToggleModal.bind(this);
    }
    _handleMouseEnter() {
        this.setState(() => ({ hovered: true }));
    }
    _handleMouseLeave() {
        this.setState(() => ({ hovered: false }));
    }
    _handleToggleModal() {
        this.setState(prevState => ({ showModal: !prevState.showModal }));
    }

    onTypingNameChange = (e) => {
        this.setState({
            name: e.event.currentTarget.value,
        })
    }

    onTypingDesChange = (e) => {
        this.setState({
            description: e.event.currentTarget.value,
        })
    }

    handleSubmit = (e) => {
        // e.preventDefault()
        this.props.editBoard(this.state, this.props.board, this.props.currentUser)
        this.handleToggleModal()
        // e.target.reset()
    }

    render() {
        const { showModal } = this.state;
        const images = this.props.board.favorite_posts;
        return (
            <Fragment>
                <Box maxWidth={316} padding={2} column={12}>
                    <Card
                        onMouseEnter={this.handleMouseEnter}
                        onMouseLeave={this.handleMouseLeave}>

                        <Collage
                            columns={3}
                            height={300}
                            width={300}
                            renderImage={({ index, width, height }) => {
                                // console.log(images)
                                // console.log(index);
                                // console.log(images[index]);
                                const image = images[index];
                                return (
                                    <Mask shape="rounded" wash width={width} height={height}>
                                        <Image
                                            alt="collage image"
                                            color={'white'}
                                            fit="cover"
                                            // naturalHeight={image.naturalHeight}
                                            // naturalWidth={image.naturalWidth}
                                            naturalHeight={500}
                                            naturalWidth={500}
                                            src={image ? image.full_picture : null}
                                        />
                                    </Mask>
                                );
                            }}
                        />

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
                        {this.state.hovered ?
                        <Box justifyContent="center" alignItems="center" display="flex">
                            <Box padding={1}>
                                <IconButton
                                    accessibilityLabel="View"
                                    bgColor="transparent"
                                    icon="view-type-default"
                                    iconColor="gray"
                                // onClick={() => this.props.handleDeleteBoard(this.props.board.id)}
                                />
                            </Box>
                            <Box padding={1}>
                                <IconButton
                                    accessibilityLabel="Edit"
                                    bgColor="transparent"
                                    icon="edit"
                                    iconColor="gray"
                                    onClick={this.handleToggleModal}
                                />
                                {showModal && (
                                    <Modal
                                        accessibilityCloseLabel="close"
                                        accessibilityModalLabel="Edit Julia's board"
                                        heading="Edit your board"
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
                                                            <Button text="Cancel" inline onClick={this.handleToggleModal} />
                                                        </Box>
                                                        <Box paddingX={1}>
                                                            <Button color="red" inline text="Save" type="submit" onClick={this.handleSubmit} />
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
                                                        <TextField id="name" onChange={this.onTypingNameChange} />
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
                            <Box padding={1}>
                                <IconButton
                                    accessibilityLabel="Delete"
                                    bgColor="transparent"
                                    icon="trash-can"
                                    iconColor="gray"
                                    onClick={() => this.props.handleDeleteBoard(this.props.board.id)}
                                />
                            </Box>
                            <Box>
                                <Box padding={1} display="inlineBlock" ref={this.anchorRef} >
                                    <IconButton
                                        accessibilityLabel="see more"
                                        accessibilityHaspopup
                                        accessibilityExpanded={this.state.isOpen}
                                        bgColor="transparent"
                                        icon="ellipsis"
                                        iconColor="gray"
                                        onClick={() => this.setState({ isOpen: !this.state.isOpen })}
                                    />
                                </Box>
                                {this.state.isOpen && (
                                    <Flyout anchor={this.anchorRef.current} onDismiss={() => undefined} idealDirection="up" size={165}>
                                        <Box display="flex">
                                            <IconButton
                                                accessibilityLabel="Facebook"
                                                bgColor="transparent"
                                                icon="facebook"
                                                iconColor="gray"
                                            // onClick={() => this.props.handleDeleteBoard(this.props.board.id)}
                                            />
                                            <IconButton
                                                accessibilityLabel="Twitter"
                                                bgColor="transparent"
                                                icon="twitter"
                                                iconColor="gray"
                                            // onClick={() => this.props.handleDeleteBoard(this.props.board.id)}
                                            />
                                            <IconButton
                                                accessibilityLabel="Gmail"
                                                bgColor="transparent"
                                                icon="gmail"
                                                iconColor="gray"
                                            // onClick={() => this.props.handleDeleteBoard(this.props.board.id)}
                                            />
                                            <IconButton
                                                accessibilityLabel="Download"
                                                bgColor="transparent"
                                                icon="download"
                                                iconColor="gray"
                                            // onClick={() => this.props.handleDeleteBoard(this.props.board.id)}
                                            />
                                        </Box>
                                    </Flyout>
                                )}
                            </Box>
                        </Box>
                        :null}
                    </Card>
                </Box>
            </Fragment>
        )
    }
}

export default Board;