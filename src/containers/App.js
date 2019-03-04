import React, { Component, Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import '../App.css';
import Login from '../components/Login';
import NotFound from '../components/NotFound';
import ThrowBack from './ThrowBack'


class App extends Component {

  state = {
    currentUser: null,
    loading: true
  }

  handleLogin = (username, password) => {
    fetch(`http://localhost:4000/api/v1/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
      .then(res => res.json())
      .then(data => {
        // console.log(data)
        if (data.error) {
          // console.log(data)
          alert('Incorrect username or password')
        } else {
          // console.log(data)
          this.setState({ currentUser: data.user })
          localStorage.setItem("main_token", data.token)
        }
      })
  };

  componentDidMount() {
    let token = localStorage.getItem('main_token')
    if (token) {
      fetch(`http://localhost:4000/api/v1/profile`, {
        method: "GET",
        headers: {
          "Authentication": `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          this.setState({
            currentUser: data,
            loading: false
          })
        })
    } else {
      this.setState({ loading: false })
    }
  }

  handleLogOut = () => {
    this.setState({
      currentUser: null
    })
    localStorage.clear()
  }

  render() {
    return (
      <Fragment>
        {!this.state.loading ?
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/login" />} />

            <Route exact path="/ThrowBack" render={() => {
              return this.state.currentUser ?
                <ThrowBack
                  logged_in={this.state.currentUser}
                  onLoading={this.state.loading}
                  onLogIn={this.handleLogin}
                  onLogOut={this.handleLogOut}
                />
                :
                <Redirect to='/login' />
            }}
            />

            <Route exact path="/login" render={() => {
              return this.state.currentUser ? <Redirect to='/ThrowBack' />
                :
                <Login onLogIn={this.handleLogin} />
            }}
            />

            <Route component={NotFound} />

          </Switch> : null}
      </Fragment>
    );
  }
}

export default App;
