import React from 'react'
import { connect } from 'react-redux'
import { Header } from 'semantic-ui-react'
import TeamBoardsList from './TeamBoardsList'

class TeamContainer extends React.Component {
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
        Team Boards
      </Header>
      {this.props.user ?
        this.props.user.teams.map( team => {
          return <TeamBoardsList key={team.name + team.id} team={team} />
        })
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
