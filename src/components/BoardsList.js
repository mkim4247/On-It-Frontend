import React from 'react'
import { connect } from 'react-redux'
import { Header, Dropdown, Card } from 'semantic-ui-react'
import BoardCard from './BoardCard'
import EmptyBoardCard from './EmptyBoardCard'
import { deletingTeam } from '../redux/actions'

class BoardsList extends React.Component {

  handleDeleteTeam = event => {
    let confirm = window.confirm("Are you sure you want to delete this team?")

    if(confirm){
      this.props.deletingTeam(this.props.owner)
    }
  }

  render(){
    return(
      <div id='personal'>
        <Header size={'medium'}>
          {this.props.owner.type === 'user' ?
            'PERSONAL BOARDS'
            :
            <Dropdown text={this.props.owner.name}>
              <Dropdown.Menu>
                <Dropdown.Item>
                  Edit
                </Dropdown.Item>
                <Dropdown.Item onClick={this.handleDeleteTeam}>
                  Delete Team
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          }
        </Header>
        <Card.Group itemsPerRow={3}>
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

export default connect(mapStateToProps, { deletingTeam })(BoardsList)
