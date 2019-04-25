import React from 'react'
import { connect } from 'react-redux'
import { deletingUserBoard } from '../redux/actions'
import { NavLink } from 'react-router-dom'

class BoardHeader extends React.Component {

  deleteBoard = event => {
    this.props.deletingUserBoard(this.props.board)
  }

  render(){
    return(
      <div>
        {this.props.board ?
        this.props.board.name : null }
        <br/>
        <NavLink to='/home'>
        <button onClick={this.deleteBoard}> Delete Board </button>
        </NavLink>
        
      </div>
    )
  }
}

export default connect(null, { deletingUserBoard })(BoardHeader)
