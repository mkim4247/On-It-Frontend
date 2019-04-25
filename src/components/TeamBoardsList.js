import React from 'react'
import BoardCard from './BoardCard'

class TeamBoardsList extends React.Component {
  render(){
    return(
      <div>
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

export default TeamBoardsList
