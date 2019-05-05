import React from 'react'
import { connect } from 'react-redux'
import Nav from '../Nav'
import { setBoardForShowPage } from '../../redux/actions'
import BoardHeader from './BoardHeader'
import ProjectContainer from './ProjectContainer'
import EmptyProjectCard from './EmptyProjectCard'

class BoardShow extends React.Component {

  setBoardFromParams = () => {
    if(this.props.user){
      if(this.props.path === "user"){
        let user_board = this.props.user.boards.find( board => (board.name === this.props.match.params.board) && (board.id === parseInt(this.props.match.params.board_id)) )

        if(user_board){
            this.props.setBoardForShowPage(user_board)
        }
      }
      else {
        let team = this.props.user.teams.find( team => (team.name === this.props.match.params.team) && (team.id === parseInt(this.props.match.params.team_id)) )

        let team_board = team.boards.find( board => (board.name === this.props.match.params.board) && (board.id === parseInt(this.props.match.params.board_id)) )

        if(team_board){
            this.props.setBoardForShowPage(team_board)
        }
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
        <div
          id='board-container'
          style={
            this.props.board ?
              {backgroundImage: `url(${this.props.board.background_image})`}
              : null
            }>
          <BoardHeader
            ownProps={this.props.ownProps}
            board={
              this.props.path === "user" ?
                {...this.props.board, type: "user"}
                :
                {...this.props.board, type: "team"}
              }
            team={
              this.props.user ?
                this.props.user.teams.find( team => team.name === this.props.match.params.team )
                : null
              }
          />
          <div id='board-projects-container'>
            {this.props.board ?
              this.props.board.projects.map( project => (
                <ProjectContainer
                  key={`pc-${project.name}${project.id}`}
                  project={
                    this.props.path === "user" ?
                      {...project, type: "user"}
                      :
                      {...project, type: "team"}
                    }
                />
              ))
              : null
            }
            <EmptyProjectCard
              board={
                this.props.path === "user" ?
                  {...this.props.board, type: "user"}
                  :
                  {...this.props.board, type: "team"}
                }
            />
          </div>
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

export default connect(mapStateToProps, { setBoardForShowPage })(BoardShow)
