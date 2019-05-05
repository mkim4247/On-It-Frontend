import React from 'react'
import { connect } from 'react-redux'
import { Header, Card } from 'semantic-ui-react'
import BoardCard from './BoardCard'
import EmptyBoardCard from './EmptyBoardCard'
import { NavLink } from 'react-router-dom'

class BoardsList extends React.Component {

  state = {
    mouseOver: false
  }

  handleMouseOver = event => {
    this.setState({
      mouseOver: true
    })
  }

  handleMouseOut = event => {
    this.setState({
      mouseOver: false
    })
  }

  render(){
    return(
      <div className='board-list'>
        <Header size={'medium'}>
          {this.props.owner.type === 'user' ?
            'PERSONAL BOARDS'
            :
            <NavLink
              to={`/team/${this.props.owner.name}`}>
              {this.props.owner.name}
            </NavLink>
          }
        </Header>
        <Card.Group itemsPerRow={3} style={{ marginBottom: "5px"}}>
          {this.props.owner.type === "user" ?
            this.props.owner.boards.map( user_board => (
              <BoardCard
                key={`board-${user_board.name}`}
                owner={this.props.owner}
                board={user_board}
              />
            ))
            :
            this.props.owner.boards.map( team_board => (
              <BoardCard
                key={`board-${team_board.name}`}
                owner={this.props.owner}
                board={team_board}
              />
            ))
          }
        <EmptyBoardCard owner={this.props.owner} />
        </Card.Group>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(BoardsList)
