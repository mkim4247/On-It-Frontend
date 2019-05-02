import React from 'react'
import { connect } from 'react-redux'
import { Header, Dropdown } from 'semantic-ui-react'
import BoardCard from './BoardCard'
import EmptyBoardCard from './EmptyBoardCard'
import { deletingTeam } from '../redux/actions'

class BoardsList extends React.Component {

  handleDeleteTeam = event => {
    let confirm = window.confirm("Are you sure?")
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
            <Dropdown text={this.props.owner.name} >
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

        {this.props.owner.type === "user" ?
            this.props.owner.boards.map( user_board => {
              return <BoardCard owner={this.props.owner} board={user_board} key={user_board.name}/>
            })
          :
            this.props.owner.boards.map( team_board => {
              return <BoardCard owner={this.props.owner} board={team_board} key={team_board.name} />
            })
        }
        <EmptyBoardCard owner={this.props.owner} />
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
