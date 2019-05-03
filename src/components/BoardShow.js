import React from 'react'
import { connect } from 'react-redux'
import Nav from './Nav'
import { setBoardForShowPage } from '../redux/actions'
import BoardHeader from './BoardHeader'
import ProjectContainer from './ProjectContainer'
import EmptyProjectCard from './EmptyProjectCard'

class BoardShow extends React.Component {

  setBoardFromParams = () => {
    if(this.props.user){
      if(this.props.path === "user"){
        let board = this.props.user.boards.find( board => board.name === this.props.match.params.board )

        if(board){
            this.props.setBoardForShowPage(board)
        }
      }
      else {
        let team = this.props.user.teams.find( team => team.name === this.props.match.params.team )

        let board = team.boards.find( board => board.name === this.props.match.params.board )

        if(board){
            this.props.setBoardForShowPage(board)
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
