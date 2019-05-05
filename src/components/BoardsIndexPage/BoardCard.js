import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { Header } from 'semantic-ui-react'

class BoardCard extends React.Component {

  render(){
    return(
      <NavLink
        to={
          this.props.owner.type === "user" ?
          `/user/${this.props.owner.username}/boards/${this.props.board.name}/${this.props.board.id}`
          :
          `/team/${this.props.owner.name}/${this.props.owner.id}/boards/${this.props.board.name}/${this.props.board.id}`}>
        <div
          style={{
            backgroundImage: `url(${this.props.board.background_image})`
          }}
          className='board-card'>
          <Header
            as='h1'
            textAlign='center'
            style={{
              color: 'white',
              textShadow: '1px 1px 1px black'
            }}>
            {this.props.board.name.length > 20 ?
              this.props.board.name.slice(0, 20) + '...'
              :
              this.props.board.name
            }
          </Header>
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
