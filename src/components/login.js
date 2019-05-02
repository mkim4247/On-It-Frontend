import React from 'react'
import {Link} from 'react-router-dom'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'

import {connect} from 'react-redux'
import {settingUser} from '../redux/actions'

class Login extends React.Component {

  state = {
    username: "",
    password: ""
  }

  handleChange = event => {
    this.setState({
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.settingUser(this.state)
  }


  render(){
    return(
      <div className='login-form'>
        <style>
          {`
          body > div,
          body > div > div,
          body > div > div > div.login-form {
          height: 100%;
          }`}
        </style>

      <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 500 }}>
        <Header id='login-header' color='black' textAlign='center' size='huge'>
          Login Here
        </Header>
        <Form size='large' onSubmit={this.handleSubmit}>
         <Segment stacked>
          <Form.Input fluid icon='user' iconPosition='left' label='Enter Username:' type='text' name='username' onChange={this.handleChange} placeholder="username"/>
          <Form.Input fluid label='Password:' type='password' name='password' onChange={this.handleChange} placeholder="password"/>
          <Button fluid > Login </Button>
          </Segment>
        </Form>
        <Message>
        <Link to='/new'>
          Create an Account
        </Link>
        </Message>

      </Grid.Column>
      </Grid>
      </div>
    )
  }

}

export default connect(null, {settingUser})(Login)
