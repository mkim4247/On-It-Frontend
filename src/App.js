import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import './App.css';
import { NavLink, Route, Switch, Redirect, withRouter } from 'react-router-dom'
import { checkingToken } from './redux/actions'
// import 'semantic-ui-css/semantic.min.css'
import Login from './components/login'
import Home from './components/home'

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
          <Route exact path='/' render={ () => (
                this.props.user ?
                <Home /> : <Redirect to='/login' />
              )} />
            <Route exact path='/login' render={ () => (
              this.props.user ?
                  <Redirect to="/" /> : <Login />
              )} />
        </Switch>
      </div>
    );
  }
}

// <Route exact path='/new' render={ () => (
//     this.props.user ?
//     <Redirect to='/' /> : <Create />
//   )} />
// <Route exact path='/rules' render={ () => (
//     <Rules />
//   )} />
// <Route exact path='/about' render={ () => (
//     <About />
//   )} />
// <Route component={NotFound}/>

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default withRouter(connect(mapStateToProps, { checkingToken })(App));
