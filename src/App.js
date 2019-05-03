import React, { Component } from 'react';
import { connect } from 'react-redux'
import './App.css';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import { checkingToken } from './redux/actions'
import Login from './components/Login'
import Home from './components/Home'
import Create from './components/Create'
import BoardShow from './components/BoardShow'
import TeamShow from './components/TeamShow'

class App extends Component {
  componentDidMount(){
    let token = localStorage.getItem('token')

    if(token){
      this.props.checkingToken(token)
    }
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/home' render={ ownProps => (
            this.props.user ?
              <Home {...ownProps}/> : <Redirect to='/login' />
          )}/>
          <Route exact path='/login' render={ () => (
            this.props.user ?
              <Redirect to="/home" /> : <Login />
          )}/>
          <Route exact path='/new' render={ () => (
            this.props.user ?
              <Redirect to='/home' /> : <Create />
          )}/>
          <Route exact path='/user/:username/:board' render={ ownProps => (
            this.props.user ?
              <BoardShow {...ownProps} path="user"/> : <Redirect to='/login'/>
          )}/>
          <Route exact path='/team/:team/:board' render={ ownProps => (
            this.props.user ?
              <BoardShow {...ownProps} path="team"/> : <Redirect to='/login'/>
          )}/>
          <Route exact path='/team/:team' render={ ownProps => (
            this.props.user ?
              <TeamShow {...ownProps} /> : <Redirect to='/login'/>
            )}/>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default withRouter(connect(mapStateToProps, { checkingToken })(App));
