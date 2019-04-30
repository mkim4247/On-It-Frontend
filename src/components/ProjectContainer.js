import React from 'react'
import { connect } from 'react-redux'
import { deletingProject, addingNewTodo } from '../redux/actions'
import TodoContainer from './TodoContainer'
import CommentForm from './CommentForm'
import CommentContainer from './CommentContainer'

class ProjectContainer extends React.Component {
  state = {
    title: "",
    description: "",
    due_date: ""
  }

  deleteProject = event => {
    this.props.deletingProject(this.props.project, this.props.path)
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
      <div className='project-container'>
      {this.props.project.name}
      <div>
        Description: {this.props.project.description}
      </div>
      <button onClick={this.deleteProject}> Delete Project </button>
      <div>
        {this.props.project.todos.map( user_todo => (
          <TodoContainer todo={user_todo} project={this.props.project} key={user_todo.title + user_todo.id}/>
        ))}
        Add a Todo
        <form onSubmit={this.submitUserTodo}>
          <input type="text" name='title' onChange={this.handleChange} required placeholder='To Do'/>
          <input type="text" name="description" onChange={this.handleChange} placeholder='Description' />
          <input type="date" name="due_date" onChange={this.handleChange} />
          <input type='submit' />
        </form>
      </div>

      <CommentForm project={this.props.project} />
      <CommentContainer project={this.props.project} />
      </div>
    )
  }

}

export default connect(null, { deletingProject, addingNewTodo })(ProjectContainer)
