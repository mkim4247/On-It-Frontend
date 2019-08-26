import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Button, Form } from 'semantic-ui-react'
import { settingUser } from '../../redux/userActions'

class LandingLogin extends React.Component {
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
        <section className='container'>
          <div className='row'>
            <div className='login-container'>
              <h1> Log in to On It! </h1>

              <Form onSubmit={this.handleSubmit} size='small'>
                <Form.Field>
                  <label htmlFor='username'> Username </label>
                  <Form.Input type='text' name='username' placeholder='Username' onChange={this.handleChange}/>
                  <label htmlFor='password'> Password </label>
                  <Form.Input type='password' name='password' placeholder='Password' onChange={this.handleChange}/>
                  <Button fluid color='teal' onClick={this.handleSubmit}> Log In </Button>
                </Form.Field>
              </Form>

                <NavLink
                  to='/new'>
                  <Button
                    fluid
                    color='teal'>
                    CREATE ACCOUNT
                  </Button>
                </NavLink>

            </div>
          </div>
        </section>
    )
  }
}

export default connect(null, {settingUser})(LandingLogin)
