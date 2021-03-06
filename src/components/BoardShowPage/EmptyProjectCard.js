import React from 'react'
import { connect } from 'react-redux'
import { Card, Modal, Button, Form, Header } from 'semantic-ui-react'
import { addingNewProject } from '../../redux/projectActions'
import PropTypes from 'prop-types';

class EmptyProjectCard extends React.Component {

  state = {
    name: "",
    description: "",
    showModal: false
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    event.target.reset()
    this.props.addingNewProject(this.state, this.props.board)
    this.setState({
      showModal: false
    })
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

  render(){
    const { showModal } = this.state

    return(
      <div className='project-container'>
        <Card>
          <Card.Content>
            <Card.Header>
              <Button
                onClick={this.openModal}
                fluid
                color='teal'>
                + Add Project
              </Button>
            </Card.Header>
          </Card.Content>
        </Card>

        <Modal
          onClose={this.closeModal}
          open={showModal}
          size='mini'>
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
              <Header
                as='h5'
                textAlign='center'>
                Add Project
              </Header>
              <Form.Field>
                <label htmlFor='name'>
                  Project
                </label>
                <Form.Input
                  type='text'
                  name='name'
                  placeholder='Name'
                  onChange={this.handleChange}
                  required/>
              </Form.Field>
              <Form.Field>
                <label htmlFor='description'>
                  Description (optional)
                </label>
                <Form.TextArea
                  type='text'
                  name='description'
                  placeholder='Description'
                  onChange={this.handleChange}/>
                <Button
                  type='submit'
                  fluid
                  color='teal'>
                  Submit
                </Button>
              </Form.Field>
            </Form>
          </Modal.Content>
        </Modal>
      </div>
    )
  }
}

export default connect(null, {addingNewProject})(EmptyProjectCard)


EmptyProjectCard.defaultProps = {
  reservations: [{start: '', end:'', title: ''}]
}

EmptyProjectCard.propTypes = {
  reservations: PropTypes.array,
  selectingTimeSlot: PropTypes.func
}
