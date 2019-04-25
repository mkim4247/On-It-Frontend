import React from 'react'
import { connect } from 'react-redux'
import Nav from './Nav'
import Sidebar from './SideBar'
import UserBoardsList from './UserBoardsList'
import TeamContainer from './TeamContainer'

class Home extends React.Component {

  render(){
    return (
      <div>
        <Nav />
        <div id='home'>
          <Sidebar />
          <div id='home-container'>
            <UserBoardsList />
            <TeamContainer />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Home)
