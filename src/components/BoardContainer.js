import React from 'react'
import { connect } from 'react-redux'
import Nav from './Nav'
import { setBoardForShowPage } from '../redux/actions'
import BoardHeader from './BoardHeader'
import ProjectContainer from './ProjectContainer'
import EmptyUserProject from './EmptyUserProject'

class BoardContainer extends React.Component {

  setBoardFromParams = () => {
    if(this.props.user){
      let board = this.props.user.user_boards.find(board => board.name === this.props.match.params.board)

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
        <BoardHeader board={this.props.board} />
        <div id='board-container'>
        {this.props.board ?
          this.props.board.projects.map( user_project => (
            <ProjectContainer key={user_project.name + user_project.id} project={user_project} />
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

export default connect(mapStateToProps, { setBoardForShowPage })(BoardContainer)
