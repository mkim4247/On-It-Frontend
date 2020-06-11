import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Header, Button } from 'semantic-ui-react'
import { deletingUser } from '../../redux/userActions'
import UserHeader from './UserHeader'
import Invites from '../Invites'
import EditUser from './EditUser'
import Nav from '../Nav'
import Sidebar from '../SideBar'
import PropTypes from 'prop-types';

class UserShow extends React.Component {

  state = {
    redirect: false
  }

  handleDeleteUser = event => {
    let confirm = window.confirm("Are you sure you want to delete your account?")

    if(confirm){
      this.props.deletingUser()
      localStorage.clear()
      this.setState({
        redirect: true
      })
    }
  }

  render(){
    return(
      this.state.redirect ?
        <Redirect to='/login'/>
        :
        <div>
          <Nav />
          <div className='home'>
            <Sidebar ownProps={this.props}/>
            <div className='home-board-container'>
              <UserHeader user={this.props.user}/>
              <EditUser />
            </div>
            <Invites />

            <Header sub textAlign='center'>
              <Button
                color='red'
                onClick={this.handleDeleteUser}>
                Delete Account
              </Button>
            </Header>
          </div>
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    team: state.team,
  }
}

export default connect(mapStateToProps, { deletingUser })(UserShow)
