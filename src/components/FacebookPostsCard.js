import React, { Component, Fragment } from 'react';
import {
    Box, Card, Image, Text, IconButton, Mask,
    Divider, Icon, Link, Layer, Toast
} from 'gestalt';
import 'gestalt/dist/gestalt.css';


class FacebookPostsCard extends Component {

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
        this.props.handleFBCardClicked(this.props.post, this.props.facebookUser)
        this.handleConfirmationClick(e)
    }

    render() {
        // console.log(this.props)
        const { showLayer } = this.state;
        return (
            <Fragment>
                {this.props.post.place ?
                    <Box maxWidth={500} column={12} padding={6} justifyContent="center" alignItems="center">
                        {this.props.post.full_picture ?
                        <Box>
                             <Card
                                onMouseEnter={this.handleMouseEnter}
                                onMouseLeave={this.handleMouseLeave}>
                                {this.props.post.attachments.data[0].media ?
                                    <Mask shape="rounded">
                                        <Image
                                            alt={this.props.post.id}
                                            color="rgb(255, 255, 255)"
                                            naturalHeight={500}
                                            naturalWidth={700}
                                            src={this.props.post.attachments.data[0].media.image.src}
                                            style="border-radius: 5px;"
                                        />
                                    </Mask>
                                    :
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
                                }
                                {this.props.post.message ?
                                    <Box>
                                        <Text>
                                            <Box paddingX={3} paddingY={2}>
                                                {this.props.post.message}
                                            </Box>
                                        </Text>
                                        <Divider />
                                        <Box alignItems="end" display="flex">
                                            <Box marginRight={1} padding={1}>
                                                <Icon icon="location" accessibilityLabel="Location" color="darkGray" />
                                            </Box>
                                            <Text align="center" bold size="sm" color="darkGray">
                                                {this.props.post.place.name}
                                            </Text>
                                        </Box>
                                    </Box>
                                    :
                                    <Text>
                                        <Box paddingX={3} paddingY={2} bold size="sm">
                                            {this.props.post.attachments.data[0].title}
                                        </Box>
                                        <Box paddingX={3} paddingY={2}>
                                            {this.props.post.attachments.data[0].description}
                                        </Box>
                                        <Link href={this.props.post.attachments.data[0].url}>
                                            <Box paddingX={3} paddingY={2}>
                                                <Text>Go to this link!</Text>
                                            </Box>
                                        </Link>
                                    </Text>
                                }
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
                                                                src={this.props.post.attachments.data[0].media.image.src}
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
                        :
                        <Box>
                            <Card
                                onMouseEnter={this.handleMouseEnter}
                                onMouseLeave={this.handleMouseLeave}>
                                <Box>
                                    <Text>
                                        <Box paddingX={3} paddingY={2}>
                                            {this.props.post.message}
                                        </Box>
                                    </Text>
                                    <Divider />
                                    <Box alignItems="end" display="flex">
                                        <Box marginRight={1} padding={1}>
                                            <Icon icon="location" accessibilityLabel="Location" color="darkGray" />
                                        </Box>
                                        <Text align="center" bold size="sm" color="darkGray">
                                            {this.props.post.place.name}
                                        </Text>
                                    </Box>
                                </Box>
                                <Box padding={1} justifyContent="end" alignItems="center">
                                    <IconButton
                                        accessibilityLabel="Love"
                                        bgColor="transparent"
                                        icon="heart"
                                        iconColor={this.state.showConfirmationToast ? "red" : "gray"}
                                        onClick={this.onHandleClick}
                                    />
                                </Box>
                            </Card>
                        </Box>     
                        }
                    </Box>
                    :
                    <Box maxWidth={500} column={12} padding={6} justifyContent="center" alignItems="center">
                        {this.props.post.full_picture ?
                            <Card
                                onMouseEnter={this.handleMouseEnter}
                                onMouseLeave={this.handleMouseLeave}
                            >
                                {this.props.post.attachments.data[0].media ?
                                    <Mask shape="rounded">
                                        <Image
                                            alt={this.props.post.id}
                                            color="rgb(255, 255, 255)"
                                            naturalHeight={500}
                                            naturalWidth={700}
                                            src={this.props.post.attachments.data[0].media.image.src}
                                            style="border-radius: 5px;"
                                        />
                                    </Mask>
                                    :
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
                                }
                                {this.props.post.message ?
                                    <Text>
                                        <Box paddingX={3} paddingY={2}>
                                            {this.props.post.message}
                                        </Box>
                                    </Text>
                                    :
                                    <Text>
                                        <Box paddingX={3} paddingY={2}>
                                            {this.props.post.attachments.data[0].title}
                                        </Box>
                                        <Box paddingX={3} paddingY={2}>
                                            {this.props.post.attachments.data[0].description}
                                        </Box>
                                        <Link href={this.props.post.attachments.data[0].url}>
                                            <Box paddingX={3} paddingY={2}>
                                                <Text>Go to this link!</Text>
                                            </Box>
                                        </Link>
                                    </Text>
                                }
                                <Box display="flex" justifyContent="end" alignItems="center">
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
                                                                src={this.props.post.attachments.data[0].media.image.src}
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
                                <Text>
                                    <Box paddingX={3} paddingY={2}>
                                        {this.props.post.message}
                                    </Box>
                                </Text>
                                <Box alignItems="baseline" justifyContent="end" alignItems="center">
                                    <IconButton
                                        accessibilityLabel="Love"
                                        bgColor="transparent"
                                        icon="heart"
                                        iconColor={this.state.showConfirmationToast ? "red" : "gray"}
                                        onClick={this.onHandleClick}
                                    />
                                </Box>
                            </Card>
                        }
                    </Box>
                }
            </Fragment>
        )
    }
}

export default FacebookPostsCard;