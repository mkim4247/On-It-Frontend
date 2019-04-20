import React from 'react'
import {Link} from 'react-router-dom'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

class Login extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      username: "",
      password: ""
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleLoginSubmit = (event) => {
    fetch(`http://localhost:4247/api/v1/login`, {
      method:"POST",
      headers: {
        "Content-type":"application/json",
        Accept:"application/json"
      },
      body: JSON.stringify(this.state)
    })
    .then(res => res.json())
    .then(data => {
      if(data.error){
        alert('Incorrect username and/or password')
      }else{
        console.log(data)
        this.props.setCurrentUser(data.user_info)
        localStorage.setItem('token', data.token)
      }
    })
  };

  render(){
    return(
      <div className='login-form'>
      <style>{`
        body > div,
        body > div > div,
        body > div > div > div.login-form {
        height: 100%;
      }`}</style>

      <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 500 }}>
        <Header id='login-header' color='black' textAlign='center' size='huge'>
          Login Here
        </Header>
        <Form size='large' onSubmit={this.handleLoginSubmit}>
         <Segment stacked>
          <Form.Input fluid icon='user' iconPosition='left' label='Enter Username:' type='text' name='username' onChange={this.handleChange} placeholder="username"/>
          <Form.Input fluid icon='lock' iconPosition='left' label='Password:' type='password' name='password' onChange={this.handleChange} placeholder="password"/>
          <Button fluid icon='lock' iconPosition='left'> Login </Button>
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

export default Login
