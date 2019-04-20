import React from 'react'
import { Form } from 'semantic-ui-react'
import Nav from './nav'

class Edit extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      name: props.currentUser.name,
      username: props.currentUser.username,
      email: props.currentUser.email,
      bio: props.currentUser.bio,
      avatar: props.currentUser.avatar,
      password: props.currentUser.password
    }
  }

  handleSubmit = (event) => {
    fetch(`http://localhost:4247/api/v1/users/${this.props.currentUser.id}`, {
      method:"PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
          name: this.state.name,
          username: this.state.username,
          email: this.state.email,
          bio: this.state.bio,
          avatar: this.state.avatar,
          password: this.state.password
      })
    })
    .then(res => res.json())
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

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render(){
    return(
      <div>
        <Nav setCurrentUser={this.props.setCurrentUser}/>

        Edit Your Account
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths='equal'>
            <Form.Input fluid label='Name' name='name' placeholder='Name' value={this.state.name} onChange={this.handleChange}/>
            <Form.Input fluid label='Username' name='username' placeholder='Username' value={this.state.username} onChange={this.handleChange}/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Input fluid label='Password' name='password' type='password' value={this.state.password} onChange={this.handleChange}/>
            <Form.Input fluid label='Email' name='email' placeholder='Email' value={this.state.email} onChange={this.handleChange}/>
          </Form.Group>
          <Form.TextArea label='Bio' placeholder="What's your life motto?" value={this.state.bio} name='bio' onChange={this.handleChange}/>
          <Form.Input label="Avatar" name='avatar' value={this.state.avatar} onChange={this.handleChange}/>
          <Form.Button>Submit</Form.Button>
        </Form>
      </div>
    )
  }

}

export default Edit
