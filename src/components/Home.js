import React from 'react'
import { connect } from 'react-redux'
import Nav from './Nav'
import Sidebar from './SideBar'
import BoardsList from './BoardsIndexPage/BoardsList'
import TeamContainer from './BoardsIndexPage/TeamContainer'
import Invites from './Invites'
import PropTypes from 'prop-types';

const Home = props => {
  return (
    <div>
      <Nav />
      <div className='home'>
        <Sidebar ownProps={props}/>
        <div className='home-board-container'>
          <BoardsList
            owner={
              {...props.user, type: "user"}
            }
          />
          <TeamContainer />
        </div>
        <Invites/>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Home)
