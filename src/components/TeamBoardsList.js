import React from 'react'
import TeamBoardCard from './TeamBoardCard'
import { Header } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { deletingTeam } from '../redux/actions'
import EmptyTeamBoard  from './EmptyTeamBoard'

class TeamBoardsList extends React.Component {

  handleDeleteTeam = event => {
    this.props.deletingTeam(this.props.team)
  }

  render(){
    return(
      <div id='team-board'>
        <Header size={'small'}>
          {this.props.team.name}
        </Header>
        <button onClick={this.handleDeleteTeam}>
          Delete Team
        </button>
        {this.props.team ?
          this.props.team.team_boards.map( board => (
            <TeamBoardCard team={this.props.team} board={board} key={board.name + board.id}/>
          ))
          : null
        }
        <EmptyTeamBoard team={this.props.team} />
      </div>
    )
  }
}

export default connect(null, { deletingTeam })(TeamBoardsList)
