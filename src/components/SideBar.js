import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { addingNewTeam } from '../redux/actions'
import { Menu, Modal, Form } from 'semantic-ui-react'

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
    this.setState({ showModal: false })
  }

  render(){
    const { showModal } = this.state

    return(
      <div id='sidebar'>
        <Menu vertical secondary fluid size='massive'>

          <Menu.Item header>
            PERSONAL
          </Menu.Item>
            <Menu.Menu>
            {this.props.user ?
              this.props.user.boards.map( user_board => (
                <Menu.Item key={user_board.id + user_board.name} href={`/user/${this.props.user.username}/${user_board.name}`} >
                  {user_board.name}

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
              <Menu.Item key={team.name + team.id} href={`/team/${team.name}`}>
                {team.name}
              </Menu.Item>
            ))
          : null
          }
          <Menu.Item onClick={this.showModal}>
              + Create a Team
          </Menu.Item>

          </Menu.Menu>
          </Menu>


            <Modal size='mini' onClose={this.closeModal} open={showModal}>
              <Modal.Header>
                create team
              </Modal.Header>
              <Modal.Content>
                <Form onSubmit={this.handleSubmit}>
                <Form.Input type='text' name='name' onChange={this.handleChange} placeholder='Name' required/>
                <Form.Input type='text' name='description' onChange={this.handleChange} placeholder='Description'/>
                <br/>
                <Form.Input type='submit'/>
                </Form>
              </Modal.Content>
            </Modal>

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
