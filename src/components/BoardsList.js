import React from 'react'
import { connect } from 'react-redux'
import { Header } from 'semantic-ui-react'
import BoardCard from './BoardCard'
import EmptyUserBoard from './EmptyUserBoard'
import { deletingTeam } from '../redux/actions'

class BoardsList extends React.Component {

  handleDeleteTeam = event => {
    this.props.deletingTeam(this.props.team)
  }

  render(){
    return(
      <div id='personal'>
        <Header size={'small'}>
          {this.props.owner.type === 'user' ?
            'Personal Boards' : this.props.owner.name
          }
        </Header>
        {this.props.owner.type === "user" ?
            this.props.owner.user_boards.map( user_board => {
              return <BoardCard owner={this.props.owner} board={user_board} key={user_board.name}/>
            })
          :
            this.props.owner.team_boards.map( team_board => {
              return <BoardCard owner={this.props.owner} board={team_board} key={team_board.name} />
            })
        }
        <EmptyUserBoard />
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
