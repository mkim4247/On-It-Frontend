import React from 'react'
import { connect } from 'react-redux'
import { deletingBoard, leavingTeam } from '../redux/actions'
import { Redirect } from 'react-router-dom'
import { Header, Button } from 'semantic-ui-react'
import TeammateContainer from './TeammateContainer'

class BoardHeader extends React.Component {
  state = {
    redirect: false
  }

  deleteBoard = event => {
    let confirm = window.confirm("Are you sure?")
    if(confirm){
      this.props.deletingBoard(this.props.board, this.props.path)
      this.setState({ redirect: true })
    }
  }

  leaveTeam = event => {
    this.props.leavingTeam(this.props.team)
    this.setState({ redirect: true })
  }

  render(){
    return(
      this.state.redirect ?
        <Redirect to='/home' />
        :
      <div id='board-header'>
        {this.props.board ?
          <span>
            {this.props.board.name}
          </span>
         : null }
        <Button onClick={this.deleteBoard} size='tiny' floated='right'>
          Delete Board
        </Button>
        {this.props.team ?
          <TeammateContainer team={this.props.team}/>
          : null
        }
        <Button onClick={this.leaveTeam} size='tiny' floated='right'>
          Leave team
        </Button>
      </div>

    )
  }
}

export default connect(null, { deletingBoard, leavingTeam })(BoardHeader)
