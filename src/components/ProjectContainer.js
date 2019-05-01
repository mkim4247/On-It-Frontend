import React from 'react'
import { connect } from 'react-redux'
import { deletingProject } from '../redux/actions'
import TodoContainer from './TodoContainer'
import TodoForm from './TodoForm'
import CommentForm from './CommentForm'
import CommentContainer from './CommentContainer'
import { Card, Button, Dropdown } from 'semantic-ui-react'

class ProjectContainer extends React.Component {

  deleteProject = event => {
    let confirm = window.confirm("Are you sure?")

    if(confirm){
      this.props.deletingProject(this.props.project, this.props.path)
    }
  }

  render(){
    return(
      <div className='project-container'>
        <Card fluid>
          <Card.Content>

            <Card.Header>
              <Dropdown text={this.props.project.name} >
                <Dropdown.Menu>
                  <Dropdown.Item>
                    Edit
                  </Dropdown.Item>
                  <Dropdown.Item onClick={this.deleteProject}>
                    Delete Project
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

            </Card.Header>


              <Card.Description>
                {this.props.project.description}
              </Card.Description>

                </Card.Content>

              <Card.Content >



      <div>
        {this.props.project.todos.map( user_todo => (
          <TodoContainer todo={user_todo} project={this.props.project} key={user_todo.title + user_todo.id}/>
        ))}


        Add a Todo
        <TodoForm project={this.props.project} path={this.props.path}/>
      </div>

      <CommentForm project={this.props.project} />
      <CommentContainer project={this.props.project} />
      </Card.Content>

      </Card>

      </div>
    )
  }

}

export default connect(null, { deletingProject })(ProjectContainer)
