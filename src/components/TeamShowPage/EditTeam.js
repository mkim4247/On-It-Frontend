import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { editingTeam } from '../../redux/actions'
import { Form, Button, Header, Segment } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

class EditTeam extends React.Component {

  state = {
    id: this.props.team.id,
    name: this.props.team.name,
    description: this.props.team.description
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.editingTeam(this.state)
  }

  render(){
    return(
      <Fragment>
        <Header sub textAlign='center'>
          <NavLink to={`/team/${this.props.team.name}`}>
            <Button
              color='teal'>
              Back
            </Button>
          </NavLink>
        </Header>
        <Segment secondary padded>
          <Header as='h3' textAlign='center'>
            Edit Team Info:
          </Header>
          <Form onSubmit={this.handleSubmit}>
            <Form.Field>
            <label htmlFor='name'>
              Name
            </label>
            <Form.Input
              type='text'
              name='name'
              required
              placeholder='Name'
              value={this.state.name}
              onChange={this.handleChange}/>
              <label htmlFor='description'>
                Description
              </label>
              <Form.TextArea
                type='text'
                name='description'
                placeholder='Description'
                value={this.state.description}
                onChange={this.handleChange}/>
              <Button
                type='submit'
                fluid
                color='teal'>
                Submit
              </Button>
            </Form.Field>
          </Form>
        </Segment>
      </Fragment>
    )
  }
}

export default connect(null, { editingTeam })(EditTeam)
