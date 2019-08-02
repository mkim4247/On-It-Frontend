import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Button, Form, Header } from 'semantic-ui-react'
import { settingUser } from '../../redux/userActions'

class LandingLogin extends React.Component {
  render(){
    return(
      <div>
        <div id='login' className='vh100'>
          <div id='inner-login'>
            <Form onSubmit={this.handleSubmit} size='small'>
              <Form.Field>
                <label htmlFor='username'> USERNAME </label>
                <Form.Input type='text' name='username' placeholder='Username' onChange={this.handleChange}/>
                <label htmlFor='password'> PASSWORD </label>
                <Form.Input type='password' name='password' placeholder='Password' onChange={this.handleChange}/>
                <Button fluid color='teal' onClick={this.handleSubmit}> LOGIN </Button>
              </Form.Field>
            </Form>
            <Header sub style={{fontSize: '150%', color: 'white', textShadow: "1px 1px 1px black"}}>
              OR
            </Header>
            <div style={{padding: '10px'}}>
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
        </div>
      </div>
    )
  }
}
export default LandingLogin
