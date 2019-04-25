import React from 'react'
import { connect } from 'react-redux'
import { deletingTeamBoard } from '../redux/actions'
import { Redirect } from 'react-router-dom'

class TeamBoardHeader extends React.Component {
  state = {
    redirect: false
  }
  deleteBoard = event => {
    let confirm = window.confirm("Are you sure?")
    if(confirm){
      this.props.deletingTeamBoard(this.props.board, this.props.team)
      this.setState({ redirect: true })
    }
  }

  render(){
    return(
      this.state.redirect ?
        <Redirect to='/home' />
        :
      <div>
        {this.props.board ?
        this.props.board.name : null }
        <br/>
        <button onClick={this.deleteBoard}> Delete Board </button>

      </div>

    )
  }
}

export default connect(null, { deletingTeamBoard })(TeamBoardHeader)
