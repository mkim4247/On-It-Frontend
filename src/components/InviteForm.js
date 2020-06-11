import React from 'react'
import { connect } from 'react-redux'
import { Form, Button, Header } from 'semantic-ui-react'
import { invitingToTeam } from '../redux/teamActions'
import PropTypes from 'prop-types';

class InviteForm extends React.Component {

  state = {
    email: ""
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  submitInviteToTeam = event => {
    event.preventDefault()
    event.target.reset()

    let invite = { email: this.state.email }
    this.props.invitingToTeam(invite, this.props.team)
  }

  render(){
    return(
      <Form onSubmit={this.submitInviteToTeam}>
        <Header as='h5'>
          + INVITE MEMBER
        </Header>
        <Form.Field>
          <Form.Input
            type='text'
            name='email'
            placeholder='Enter Email'
            required
            onChange={this.handleChange}/>
          <Button
            type='submit'
            fluid
            color='teal'>
            Submit
          </Button>
        </Form.Field>
      </Form>
    )
  }
}

export default connect(null, { invitingToTeam })(InviteForm)
