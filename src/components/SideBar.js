import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Header } from 'semantic-ui-react'
import { addingNewTeam } from '../redux/actions'

class Sidebar extends React.Component {
  state = {
    showForm: false,
    name: "",
    description: ""
  }

  showNewTeamForm = event => {
    this.setState({
      showForm: !this.state.showForm
    })
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    event.target.reset()
    this.props.addingNewTeam(this.state)
    this.setState({ showForm: false })
  }

  render(){
    return(
      <div id='sidebar'>
          <Header size={'small'}>
            Personal
          </Header>

          {this.props.user ?
            this.props.user.user_boards.map( user_board => (
              <div key={user_board.name + user_board.id}>
              <NavLink to={`/user/${this.props.user.username}/${user_board.name}`}>
                {user_board.name}
              </NavLink>
            </div>
            ))
            : null
          }

          <Header size={'small'}>
          Teams
          </Header>
          {this.props.user ?
            this.props.user.teams.map( team => (
              <div key={team.name + team.id}>
              <NavLink to={`/team/${team.name}`}>
                {team.name}
              </NavLink>
            </div>
            ))
          : null
          }
            <div onClick={this.showNewTeamForm}>
              Create a Team
            </div>


            <div id='new-team-form' style={
                this.state.showForm ?
                  {display: 'block'}
                  :
                  {display: 'none'}

              }>
              <form onSubmit={this.handleSubmit}>
              <input type='text' name='name' onChange={this.handleChange} placeholder='Name' required/>
              <input type='text' name='description' onChange={this.handleChange} placeholder='Description'/>
              <br/>
              <input type='submit'/>
              </form>

            </div>

      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { addingNewTeam })(Sidebar)
