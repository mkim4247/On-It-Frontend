import React from 'react'
import { connect } from 'react-redux'
import { Header } from 'semantic-ui-react'
import TeamBoardsList from './TeamBoardsList'

class TeamBoardsContainer extends React.Component {
  renderTeamBoardsList = () => {
    if(this.props.user){
      this.props.user.teams.map( team => (
        <TeamBoardsList team={team} key={team.name + team.id}/>
      ))
    }
  }

  render(){
    return(
      <div id='team'>
      <Header size={'small'}>
        Team Boards Container
      </Header>
        {this.props.user ?
          this.props.user.teams.map( team => (
            <TeamBoardsList team={team} key={team.name + team.id}/>
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

export default connect(mapStateToProps)(TeamBoardsContainer)
