import React from 'react'
import { connect } from 'react-redux'
import { creatingNewUser } from '../redux/userActions'
import { Form, Button, Header } from 'semantic-ui-react'
import Nav from './Nav'

class Create extends React.Component {

  state = {
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: ""
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.creatingNewUser(this.state)
  }

  render(){
    return(
      <div>
        <Nav />
        <div id='login'>
          <Header as='h2'>
            CREATE ACCOUNT
          </Header>
          <div id='inner-login'>
            <Form onSubmit={this.handleSubmit} size='tiny'>
              <Form.Field>
                <label htmlFor='first_name'> FIRST NAME </label>
                <Form.Input type='text' name='first_name' placeholder='First Name' required onChange={this.handleChange}/>

                <label htmlFor='last_name'> LAST NAME </label>
                <Form.Input type='text' name='last_name' placeholder='Last Name' required onChange={this.handleChange}/>

                <label htmlFor='username'> USERNAME </label>
                <Form.Input type='text' name='username' placeholder='Username' required onChange={this.handleChange}/>

                <label htmlFor='email'> EMAIL </label>
                <Form.Input type='text' name='email' placeholder='Email' required onChange={this.handleChange}/>

                <label htmlFor='password'> PASSWORD </label>
                <Form.Input type='password' name='password' placeholder='Password' required onChange={this.handleChange}/>

                <Button fluid color='teal' onClick={this.handleSubmit}> SUBMIT </Button>
              </Form.Field>
            </Form>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(null, { creatingNewUser })(Create)
