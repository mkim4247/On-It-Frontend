import React from 'react'
import { connect } from 'react-redux'
import { Header } from 'semantic-ui-react'
import BoardsList from './BoardsList'

class TeamContainer extends React.Component {
  render(){
    return(
      <div id='team'>
        <Header size={'medium'}>
          TEAM BOARDS
        </Header>
        {this.props.user ?
          this.props.user.teams.map( team => (
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
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(TeamContainer)