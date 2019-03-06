import React, { Component, Fragment } from 'react';
import { Box, Label, Text, TextField, Button, Container} from 'gestalt';
import 'gestalt/dist/gestalt.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };
    }

    onTyping = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.onLogIn(this.state.username, this.state.password)
        e.target.reset()
    }
    render() {
        return (
            <Fragment>
                <div className="centered">
                        <Container>
                            <Box column={6} justifyContent="start" alignItems="center">
                                <form onChange={this.onTyping} onSubmit={this.handleSubmit}>
                                    <Box marginBottom={2}>
                                        <Label htmlFor="username">
                                            <Text>Username</Text>
                                        </Label>
                                    </Box>
                                    <TextField
                                        onChange={() => {}}
                                        id="username"
                                        name="username"
                                        placeholder="Username"
                                        type="text"
                                        errorMessage={!this.state.username ? "This field can't be blank!" : null}
                                    />
                                    <Box marginBottom={2}>
                                        <Label htmlFor="password">
                                            <Text>Password</Text>
                                        </Label>
                                    </Box>
                                    <TextField
                                        onChange={() => {}}
                                        id="password"
                                        name="password"
                                        placeholder="Password"
                                        type="password"
                                        errorMessage={!this.state.password ? "This field can't be blank!" : null}
                                    />
                                    <Box padding={2}>
                                        <Button color="red" text="Submit" type="submit" size="md"/>
                                    </Box>
                                </form>
                            </Box>
                        </Container>
                </div>  
            </Fragment>
        )
    }
}

export default Login;