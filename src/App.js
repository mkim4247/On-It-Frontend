import React, { Component } from 'react';
import { connect } from 'react-redux'
import './App.css';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import { checkingToken } from './redux/userActions'
import Landing from './components/LandingPage/Landing'
import Home from './components/Home'
import Create from './components/Create'
import BoardShow from './components/BoardShowPage/BoardShow'
import TeamShow from './components/TeamShowPage/TeamShow'
import UserShow from './components/UserShowPage/UserShow'
import NotFound from './components/NotFound'
import About from './components/About'

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
          <Route exact path='/boards' render={ ownProps => (
            this.props.user ?
              <Home {...ownProps}/> : <Redirect to='/login' />
          )}/>
          <Route exact path='/login' render={ () => (
            this.props.user ?
              <Redirect to="/boards" /> : <Landing />
          )}/>
          <Route exact path='/new' render={ () => (
            this.props.user ?
              <Redirect to='/boards' /> : <Create />
          )}/>
          <Route exact path='/user/:username/boards/:board/:board_id' render={ ownProps => (
            this.props.user ?
              <BoardShow {...ownProps} path="user"/> : <Redirect to='/login'/>
          )}/>
          <Route exact path='/about' render={ () => (
              <About />
          )}/>
          <Route exact path='/team/:team/:team_id/boards/:board/:board_id' render={ ownProps => (
              this.props.user ?
                <BoardShow {...ownProps} path="team"/> : <Redirect to='/login'/>
            )}/>
          <Route path='/team/:team/:team_id' render={ ownProps => (
              this.props.user ?
                <TeamShow {...ownProps} /> : <Redirect to='/login'/>
              )}/>
          <Route path='/user/:username' render={ ownProps => (
              this.props.user ?
                <UserShow {...ownProps} /> : <Redirect to='/login'/>
            )}/>
          <Route component={ NotFound }/>
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
