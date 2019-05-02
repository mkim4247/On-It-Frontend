import React from 'react'
import { connect } from 'react-redux'
import Nav from './Nav'
import Sidebar from './SideBar'
import BoardsList from './BoardsList'
import TeamContainer from './TeamContainer'
import Invites from './Invites'

class Home extends React.Component {

  render(){
    return (
      <div>
        <Nav />
        <div id='home'>
          <Sidebar />
          <div id='home-board-container'>
            <BoardsList
              owner={
                {...this.props.user, type: "user"}
              }
            />
            <TeamContainer />
          </div>
          <Invites/>
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
