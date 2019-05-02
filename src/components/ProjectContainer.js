import React from 'react'
import { connect } from 'react-redux'
import { deletingProject, addingNewTodo } from '../redux/actions'
import TodoContainer from './TodoContainer'
import CommentContainer from './CommentContainer'
import { Card, Button, Dropdown, Modal, Header, Form } from 'semantic-ui-react'

class ProjectContainer extends React.Component {
  state = {
      title: "",
      description: "",
      due_date: "",
    showModal: false
  }

  openModal = () => {
    this.setState({ showModal: true })
  }

  closeModal = () => {
    this.setState({ showModal: false })
  }

  deleteProject = event => {
    let confirm = window.confirm("Are you sure?")

    if(confirm){
      this.props.deletingProject(this.props.project, this.props.path)
    }
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
    this.setState({ showModal: false })
  }

  render(){
    const { showModal } = this.state

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
            <div id='todo-container'>
              {this.props.project.todos.map( user_todo => (
                <TodoContainer todo={user_todo} project={this.props.project} key={user_todo.title + user_todo.id}/>
              ))}
            </div>

            </Card.Content>

              <Card.Content>
                <Button onClick={this.openModal} fluid color='teal'>
                  + Add Task
                </Button>
              </Card.Content>
                <Card.Content>
            <CommentContainer project={this.props.project} />
            </Card.Content>

        </Card>

        <Modal onClose={this.closeModal}
            open={showModal} size='mini'>
          <Modal.Content>
            <Form onSubmit={this.submitUserTodo}>
              <Header as='h5' textAlign='center'>
                Add Task
              </Header>
              <Form.Field>
              <label htmlFor='title'> Task:
              </label>
              <Form.Input type="text" name='title' onChange={this.handleChange} required placeholder='Task'/>
              </Form.Field>

              <Form.Field>
                <label htmlFor='description'> Description:
                </label>
              <Form.Input type="text" name="description" onChange={this.handleChange} placeholder='Description' />
              </Form.Field>
              <Form.Field>
                <label htmlFor='due_date'>
                  Due Date:
                </label>
              <Form.Input type="date" name="due_date" onChange={this.handleChange} />
              </Form.Field>

              <Button type='submit' color='teal' fluid> Submit </Button>
            </Form>
          </Modal.Content>
        </Modal>

      </div>
    )
  }

}

export default connect(null, { deletingProject, addingNewTodo })(ProjectContainer)
