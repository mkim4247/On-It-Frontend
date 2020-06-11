import React from 'react'
import { connect } from 'react-redux'
import { Header } from 'semantic-ui-react'
import BoardsList from './BoardsList'
import PropTypes from 'prop-types';

const TeamContainer = props => {
  return(
    <div id='team'>
      <Header size={'medium'}>
        TEAM BOARDS
      </Header>
      {props.user ?
        props.user.teams.map( team => (
          <BoardsList
            key={`team-${team.id}`}
            owner={
              {...team, type: "team"}
            }
          />
        ))
        : null
      }
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(TeamContainer)
