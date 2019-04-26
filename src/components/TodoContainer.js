import React from 'react'
import { connect } from 'react-redux'
import { deletingTodo } from '../redux/actions'

class TodoContainer extends React.Component {

  deleteTodo = event => {
    this.props.deletingTodo(this.props.todo, this.props.project)
  }

  render(){
    return(
      <div>

       {this.props.todo.title}:
       {this.props.todo.description}
       <div>
         {this.props.todo.due_date}
       </div>
       <button onClick={this.deleteTodo}>
        Delete Todo
       </button>
      </div>
    )
  }
}

export default connect(null, { deletingTodo })(TodoContainer)
