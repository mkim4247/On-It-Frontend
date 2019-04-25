import React from 'react'
import { connect } from 'react-redux'
import { deletingUserProject, addingUserTodo } from '../redux/actions'
import TodoContainer from './TodoContainer'

class ProjectContainer extends React.Component {
  state = {
    title: "",
    description: "",
    due_date: ""
  }

  deleteProject = event => {
    this.props.deletingUserProject(this.props.project)
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  submitUserTodo = event => {
    event.preventDefault()
    event.target.reset()
    let todo = {...this.state, user_project_id: this.props.project.id}
    this.props.addingUserTodo(todo, this.props.project)
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
      </div>
    )
  }

}

export default connect(null, { deletingUserProject, addingUserTodo })(ProjectContainer)
