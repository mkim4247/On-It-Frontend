import React from 'react'
import { connect } from 'react-redux'
import { creatingNewUser } from '../redux/actions'
import { Form } from 'semantic-ui-react'

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
        Create an Account
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths='equal'>
            <Form.Input fluid label='First Name' name='first_name' placeholder='First Name' onChange={this.handleChange}/>
            <Form.Input fluid label='Username' name='username' placeholder='Username' onChange={this.handleChange}/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Input fluid label='Password' name='password' type='password' onChange={this.handleChange}/>
            <Form.Input fluid label='Email' name='email' placeholder='Email' onChange={this.handleChange}/>
          </Form.Group>
          <Form.TextArea label='last name' name='last_name' onChange={this.handleChange}/>

          <Form.Button>Submit</Form.Button>
        </Form>
      </div>
    )
  }

}

export default connect(null, { creatingNewUser })(Create)
