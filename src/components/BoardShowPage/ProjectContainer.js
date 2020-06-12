import React from 'react'
import { connect } from 'react-redux'
import { Card, Button, Modal, Header, Form, Icon } from 'semantic-ui-react'
import { addingNewTodo } from '../../redux/todoActions'
import { Droppable } from 'react-beautiful-dnd'
import TodoContainer from './TodoContainer'
import CommentContainer from './CommentContainer'
import EditProject from './EditProject'
import PropTypes from 'prop-types';

class ProjectContainer extends React.Component {

  // showModal and showEdit handle the two Modals opened through this Component, first the Modal with Info and the other to Edit

  state = {
    title: "",
    description: "",
    due_date: "",
    showModal: false,
    showEdit: false
  }

  openModal = () => {
    this.setState({
      showModal: true
    })
  }

  closeModal = () => {
    this.setState({
      showModal: false
    })
  }

  openEdit = () => {
    this.setState({
      showEdit: true
    })
  }

  closeEdit = () => {
    this.setState({
      showEdit: false
    })
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  submitUserTodo = event => {
    event.preventDefault()
    event.target.reset()
    this.props.addingNewTodo(this.state, this.props.project)
    this.setState({
      showModal: false
    })
  }

  render(){
    const { showModal } = this.state
    const { showEdit } = this.state

    return(
      <Droppable droppableId={this.props.project.id}>
      {(provided) => (
      <div
        className='project-container'
        ref={provided.innerRef}
        {...provided.droppableProps}
        >
        <Card fluid>
          <Card.Content>
            <Button
              icon
              floated="right"
              onClick={this.openEdit}>
              <Icon name='ellipsis horizontal'/>
            </Button>
            <Card.Header>
              {this.props.project.name}
            </Card.Header>
            <Header sub textAlign='right'>
              {this.props.project.description}
            </Header>
          </Card.Content>

          <Card.Content >
            <div id='todo-container'>
              {this.props.project.todos.sort( (a,b) => a.display_order - b.display_order).map( (user_todo, index) => (

                <TodoContainer
                  key={`todo-${user_todo.id}`}
                  index={index}
                  todo={user_todo}
                  project={this.props.project}
                />
                ))
              }
            </div>
          </Card.Content>
          <Card.Content>
            <Button
              onClick={this.openModal}
              fluid
              color='teal'>
              + Add Task
            </Button>
          </Card.Content>

          <Card.Content>
            <CommentContainer project={this.props.project} />
          </Card.Content>
        </Card>

        <Modal
          onClose={this.closeModal}
          open={showModal}
          size='mini'>
          <Modal.Content>
            <Form onSubmit={this.submitUserTodo}>
              <Header
                as='h5'
                textAlign='center'>
                Add Task
              </Header>
              <Form.Field>
                <label htmlFor='title'>
                  Task:
                </label>
                <Form.Input
                  type="text"
                  name='title'
                  onChange={this.handleChange}
                  required
                  placeholder='Task'/>
              </Form.Field>
              <Form.Field>
                <label htmlFor='description'>
                  Description (optional)
                </label>
                <Form.TextArea
                  type="text"
                  name="description"
                  onChange={this.handleChange}
                  placeholder='Description' />
              </Form.Field>
              <Form.Field>
                <label htmlFor='due_date'>
                  Due Date (optional)
                </label>
                <Form.Input
                  type="date"
                  name="due_date"
                  onChange={this.handleChange} />
                <Button
                  type='submit'
                  color='teal'
                  fluid>
                  Submit
                </Button>
              </Form.Field>
            </Form>
          </Modal.Content>
        </Modal>

        {showEdit ?
          <EditProject
            showEdit={this.state.showEdit}
            closeEdit={this.closeEdit}
            project={this.props.project} />
          :
          null
        }
        {provided.placeholder}
      </div>
    )}
    </Droppable>

    )
  }
}




export default connect(null, { addingNewTodo })(ProjectContainer)

CalendarContainer.defaultProps = {
  reservations: [{start: '', end:'', title: ''}]
}

CalendarContainer.propTypes = {
  reservations: PropTypes.array,
  selectingTimeSlot: PropTypes.func
}
