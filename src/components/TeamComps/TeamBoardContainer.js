import React from 'react'
import { connect } from 'react-redux'
import Nav from './Nav'
import { setBoardForShowPage } from '../redux/actions'
import TeamBoardHeader from './TeamBoardHeader'
import ProjectContainer from './ProjectContainer'
import EmptyUserProject from './EmptyUserProject'

class TeamBoardContainer extends React.Component {

  setBoardFromParams = () => {
    if(this.props.user){
      let team = this.props.user.teams.find(team => team.name === this.props.match.params.team)
      let board = team.team_boards.find(board => board.name === this.props.match.params.board)
      if(board){
        this.props.setBoardForShowPage(board)
      }
    }
  }

  componentDidMount(){
    this.setBoardFromParams()
  }

  componentDidUpdate(){
    this.setBoardFromParams()
  }

  render(){
    return(
      <div>
        <Nav/>
        <TeamBoardHeader board={this.props.board}
          team={
            this.props.user ?
            this.props.user.teams.find(team => team.name === this.props.match.params.team)
            : null
          }/>
        <div id='board-container'>
        {this.props.board ?
          this.props.board.projects.map( project => (
            <ProjectContainer key={project.name + project.id} project={project} />
          ))
          : null
        }
        <EmptyUserProject />
      </div>

      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    board: state.board
  }
}

export default connect(mapStateToProps, { setBoardForShowPage })(TeamBoardContainer)
