import React from 'react'
import { connect } from 'react-redux'
import Nav from './Nav'
import Sidebar from './SideBar'
import PersonalBoardsList from './PersonalBoardsList'
import TeamBoardsContainer from './TeamBoardsContainer'

class Home extends React.Component {

  render(){
    return (
      <div>
        <Nav />
        <div id='home'>
        <Sidebar />
        <div id='home-container'>
          <PersonalBoardsList />
          <TeamBoardsContainer />
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
