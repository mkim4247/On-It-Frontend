import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Form, Button, Header, Segment } from 'semantic-ui-react'
import { editingUser } from '../../redux/userActions'

class EditTeam extends React.Component {

  state = {
    first_name: this.props.user.first_name,
    last_name: this.props.user.last_name,
    username: this.props.user.username,
    email: this.props.user.email,
    disabled: true
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.editingUser(this.state)
  }

  handleClick = event => {
    this.setState({
      disabled: !this.state.disabled
    })
  }

  render(){
    return(
      <Fragment>
        <Header sub textAlign='center'>
          {this.state.disabled ?
            <Button
              onClick={this.handleClick}
              color='teal'>
              Open Form
            </Button>
            :
            <Button
              onClick={this.handleClick}
              color='teal'>
              Close Form
            </Button>
          }
        </Header>

        <Segment secondary padded>
          <Header as='h3' textAlign='center'>
            Edit Profile Info:
          </Header>
          <Form onSubmit={this.handleSubmit}>
            <fieldset disabled={this.state.disabled}>
              <Form.Field>
                <label htmlFor='first_name'>
                  First Name
                </label>
                <Form.Input
                  type='text'
                  name='first_name'
                  required
                  placeholder='First Name'
                  value={this.state.first_name}
                  onChange={this.handleChange}/>
                <label htmlFor='last_name'>
                  Last Name
                </label>
                <Form.Input
                  type='text'
                  name='last_name'
                  required
                  placeholder='Last Name'
                  value={this.state.last_name}
                  onChange={this.handleChange}/>
                <label htmlFor='username'>
                  Username
                </label>
                <Form.Input
                  type='text'
                  name='username'
                  required
                  placeholder='Username'
                  value={this.state.username}
                  onChange={this.handleChange}/>
                <label htmlFor='email'>
                  Email
                </label>
                <Form.Input
                  type='text'
                  name='email'
                  required
                  placeholder='Email'
                  value={this.state.email}
                  onChange={this.handleChange}/>
                <Button
                  type='submit'
                  fluid
                  color='teal'>
                  Submit
                </Button>
              </Form.Field>
            </fieldset>
          </Form>
        </Segment>
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { editingUser })(EditTeam)
