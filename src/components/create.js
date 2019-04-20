import React from 'react'
import { Form } from 'semantic-ui-react'

class Create extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      name: "",
      username: "",
      email: "",
      bio: "",
      avatar: "",
      password: ""
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    fetch(`http://localhost:4247/api/v1/users`, {
      method:"POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        user: {
          name: this.state.name,
          username: this.state.username,
          email: this.state.email,
          bio: this.state.bio,
          avatar: this.state.avatar,
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
            <Form.Input fluid label='Name' name='name' placeholder='Name' onChange={this.handleChange}/>
            <Form.Input fluid label='Username' name='username' placeholder='Username' onChange={this.handleChange}/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Input fluid label='Password' name='password' type='password' onChange={this.handleChange}/>
            <Form.Input fluid label='Email' name='email' placeholder='Email' onChange={this.handleChange}/>
          </Form.Group>
          <Form.TextArea label='Bio' placeholder="What's your life motto?" name='bio' onChange={this.handleChange}/>
          <Form.Input label="Avatar" name='avatar' onChange={this.handleChange}/>
          <Form.Button>Submit</Form.Button>
        </Form>
      </div>
    )
  }

}

export default Create
