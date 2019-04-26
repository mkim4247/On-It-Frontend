import React from 'react'
import { connect } from 'react-redux'
import Nav from './Nav'
import Sidebar from './SideBar'
import BoardsList from './BoardsList'
import TeamContainer from './TeamContainer'

class Home extends React.Component {

  render(){
    return (
      <div>
        <Nav />
        <div id='home'>
          <Sidebar />
          <div id='home-board-container'>
            <BoardsList owner={{...this.props.user, type: "user"}}/>
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
