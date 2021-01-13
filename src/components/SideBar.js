import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Menu, Modal, Form, Button } from 'semantic-ui-react'
import { addingNewTeam } from '../redux/teamActions'
import PropTypes from 'prop-types';

class Sidebar extends React.Component {

  state = {
    showModal: false,
    name: "",
    description: ""
  }

  showModal = event => {
    this.setState({
      showModal: true
    })
  }

  closeModal = event => {
    this.setState({
      showModal: false
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
    this.setState({
      showModal: false
    })
  }

  render(){
    const { showModal } = this.state

    return(
      <div id='sidebar'>
        <Menu
          vertical
          secondary
          fluid
          size='massive'>
          <Menu.Item header>
            PERSONAL
          </Menu.Item>
          <Menu.Menu>
            {this.props.user ?
              this.props.user.boards.map( user_board => (
                <Menu.Item
                  as={NavLink}
                  key={`board-${user_board.id}`}
                  to={`/user/${this.props.user.username}/boards/${user_board.name}/${user_board.id}`} >
                  {user_board.name.length > 15 ?
                    user_board.name.slice(0, 15) + '...'
                    :
                    user_board.name
                  }
                </Menu.Item>
              ))
              : null
            }
          </Menu.Menu>
          <Menu.Item header>
            TEAMS
          </Menu.Item>
          <Menu.Menu>
            {this.props.user ?
              this.props.user.teams.map( team => (
                <Menu.Item
                  as={NavLink}
                  active={
                    this.props.team && (team.name === this.props.team.name) && (team.name === this.props.ownProps.match.params.team) && (team.id === this.props.ownProps.match.params.team_id)
                  }
                  key={`team-${team.id}`}
                  to={`/team/${team.name}/${team.id}`}>
                  {team.name.length > 15 ?
                    team.name.slice(0, 15) + '...'
                    :
                    team.name
                  }
                </Menu.Item>
              ))
              : null
            }
            <Menu.Item onClick={this.showModal}>
              + Add Team
            </Menu.Item>
          </Menu.Menu>
        </Menu>

        <Modal
          size='mini'
          onClose={this.closeModal}
          open={showModal}>
          <Modal.Header>
            Add Team
          </Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <label htmlFor='name'>
                  Team
                </label>
                <Form.Input
                  type='text'
                  name='name'
                  onChange={this.handleChange}
                  placeholder='Name'
                  required/>
              </Form.Field>
              <Form.Field>
                <label htmlFor='description'>
                  Description
                </label>
                <Form.TextArea
                  type='text'
                  name='description'
                  onChange={this.handleChange}
                  placeholder='Description'/>
                <Button
                  type='submit'
                  fluid
                  color='teal'>
                  Submit
                </Button>
              </Form.Field>
            </Form>
          </Modal.Content>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    team: state.team
  }
}

export default connect(mapStateToProps, { addingNewTeam })(Sidebar)

// SideBar.defaultProps = {
//   reservations: [{start: '', end:'', title: ''}]
// }

// SideBar.propTypes = {
//   reservations: PropTypes.array,
//   selectingTimeSlot: PropTypes.func
// }
