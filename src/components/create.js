import React from 'react'
import { Form } from 'semantic-ui-react'

class Create extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: ""
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    fetch(`http://localhost:4247/api/v1/new`, {
      method:"POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        user: {
          first_name: this.state.first_name,
          username: this.state.username,
          email: this.state.email,
          last_name: this.state.last_name,
          password: this.state.password
        }
      })
    }).then(res => res.json())
    .then(data => {
      if(data.error){
        console.log(data)
      }else{
        console.log(data)
        this.props.setCurrentUser(data.user_info)
        localStorage.setItem('token', data.token)
      }
    })
  };

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

export default Create
