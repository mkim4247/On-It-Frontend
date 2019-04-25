import React from 'react'
import BoardCard from './BoardCard'
import { Header } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { deletingTeam } from '../redux/actions'

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
            <BoardCard board={board} key={board.name + board.id}/>
          ))
          : null
        }
      </div>
    )
  }
}

export default connect(null, { deletingTeam })(TeamBoardsList)
