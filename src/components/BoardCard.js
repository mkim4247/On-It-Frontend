import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

class BoardCard extends React.Component {
  state={
    hover: false
  }

  render(){
    return(
      <NavLink to={
          this.props.owner.type === "user" ?
          `/user/${this.props.owner.username}/${this.props.board.name}`
          :
          `/team/${this.props.owner.name}/${this.props.board.name}`
        }
      >
      <div className='board-card' onMouseOver={()=>this.setState({ hover: true })} onMouseOut={() => this.setState({hover: false})}>
        <h4>
          {this.props.board.name}
        </h4>
        <div>
        {this.props.board.description}
        </div>
      </div>
      </NavLink>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(BoardCard)
