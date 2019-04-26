import React from 'react'
import { connect } from 'react-redux'
import { Header } from 'semantic-ui-react'
import BoardsList from './BoardsList'

class TeamContainer extends React.Component {
  render(){
    return(
      <div id='team'>
      <Header size={'small'}>
        Team Boards
      </Header>
      {this.props.user ?
        this.props.user.teams.map( team => {
          return <BoardsList key={team.name + team.id} owner={{...team, type: "team"}} />
        })
        : null
      }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(TeamContainer)
