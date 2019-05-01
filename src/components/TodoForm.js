import React from 'react'
import { connect } from 'react-redux'
import { addingNewTodo } from '../redux/actions'

class TodoForm extends React.Component {
  state = {
    title: "",
    description: "",
    due_date: ""
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  submitUserTodo = event => {
    event.preventDefault()
    event.target.reset()
    this.props.addingNewTodo(this.state, this.props.project, this.props.path)
  }

  render(){
    return(
      <div>
        <form onSubmit={this.submitUserTodo}>
          <input type="text" name='title' onChange={this.handleChange} required placeholder='To Do'/>
          <input type="text" name="description" onChange={this.handleChange} placeholder='Description' />
          <input type="date" name="due_date" onChange={this.handleChange} />
          <input type='submit' />
        </form>
      </div>
    )
  }
}

export default connect(null, { addingNewTodo })(TodoForm)
