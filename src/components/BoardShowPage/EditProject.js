import React from 'react'
import { connect } from 'react-redux'
import { Header, Form, Button, Card, Modal } from 'semantic-ui-react'
import { editingProject, deletingProject } from '../../redux/projectActions'
import PropTypes from 'prop-types';

class EditProject extends React.Component {

  state = {
    id: this.props.project.id,
    name: this.props.project.name,
    description: this.props.project.description,
    type: this.props.project.type
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.editingProject(this.state)
    this.props.closeEdit()
  }

  deleteProject = event => {
    let confirm = window.confirm("Are you sure you want to delete this project?")

    if(confirm){
      this.props.deletingProject(this.props.project)
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
              Edit Project Info:
            </Header>
          </Card.Content>
          <Card.Content>
            <Card.Description>
              <Form onSubmit={this.handleSubmit}>
                <Form.Field>
                <label htmlFor='name'>
                  Name
                </label>
                <Form.Input
                  type='text'
                  name='name'
                  required
                  placeholder='Name'
                  value={this.state.name}
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
              onClick={this.deleteProject}>
              Delete Project
            </Button>
          </Card.Content>
        </Card>
      </Modal.Content>
    </Modal>

    )
  }
}

export default connect(null, { editingProject, deletingProject })(EditProject)


CalendarContainer.defaultProps = {
  reservations: [{start: '', end:'', title: ''}]
}

CalendarContainer.propTypes = {
  reservations: PropTypes.array,
  selectingTimeSlot: PropTypes.func
}
