import React from 'react'
import { connect } from 'react-redux'
import { editingTodo, deletingTodo } from '../../redux/todoActions'
import { Header, Form, Button, Card, Modal } from 'semantic-ui-react'

class EditTodo extends React.Component {

  state = {
    id: this.props.todo.id,
    title: this.props.todo.title,
    description: this.props.todo.description,
    due_date: this.props.todo.due_date
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.editingTodo(this.state, this.props.project)
    this.props.closeEdit()
  }

  deleteTodo = event => {
    let confirm = window.confirm("Are you sure you want to delete this task?")

    if(confirm){
      this.props.deletingTodo(this.props.todo, this.props.project)
    }
  }

  render(){
    return(
      <Modal
        onClose={this.props.closeEdit}
        open={this.props.showEdit}
        size='tiny'>
        <Modal.Content>
          <Card fluid>
            <Card.Content>
              <Header as='h3' textAlign='center'>
                Edit Task Info:
              </Header>
            </Card.Content>
            <Card.Content>
              <Card.Description>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Field>
                  <label htmlFor='title'>
                    Task
                  </label>
                  <Form.Input
                    type='text'
                    name='title'
                    required
                    placeholder='Task'
                    value={this.state.title}
                    onChange={this.handleChange}/>
                    <label htmlFor='description'>
                      Description
                    </label>
                    <Form.TextArea
                      type='text'
                      name='description'
                      placeholder='Description'
                      value={this.state.description}
                      onChange={this.handleChange}/>
                    <label htmlFor='due_date'>
                      Due Date
                    </label>
                    <Form.Input
                      type='date'
                      name='due_date'
                      onChange={this.handleChange}/>
                    <Button
                      type='submit'
                      fluid
                      color='teal'>
                      Submit
                    </Button>
                  </Form.Field>
                </Form>
              </Card.Description>
            </Card.Content>
            <Card.Content>
              <Button
                fluid
                color='red'
                onClick={this.deleteTodo}>
                Delete Task
              </Button>
            </Card.Content>
          </Card>
        </Modal.Content>
      </Modal>
    )
  }
}

export default connect(null, { editingTodo, deletingTodo })(EditTodo)
