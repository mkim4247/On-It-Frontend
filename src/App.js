import React, { Component } from 'react';
import { connect } from 'react-redux'
import './App.css';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import { checkingToken } from './redux/actions'
// import 'semantic-ui-css/semantic.min.css'
import Login from './components/Login'
import Home from './components/Home'
import Create from './components/Create'
import BoardContainer from './components/BoardContainer'

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
          <Route exact path='/home' render={ () => (
                this.props.user ?
                <Home /> : <Redirect to='/login' />
              )} />
            <Route exact path='/login' render={ () => (
              this.props.user ?
                  <Redirect to="/home" /> : <Login />
              )} />
            <Route exact path='/new' render={ () => (
              this.props.user ?
                <Redirect to='/home' /> : <Create />
            )} />
          <Route exact path='/:username/:board' render={ ownProps => (
              <BoardContainer {...ownProps} />
            )} />
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
