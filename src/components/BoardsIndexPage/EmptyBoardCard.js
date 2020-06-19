import React from 'react'
import { connect } from 'react-redux'
import { Modal, Form, Button, Header } from 'semantic-ui-react'
import { addingNewBoard } from '../../redux/boardActions'
import PropTypes from 'prop-types';

class EmptyBoardCard extends React.Component {

  state = {
    name: "",
    description: "",
    background_image: "",
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
    this.props.addingNewBoard(this.state, this.props.owner)
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
      <div>
        <div
          style={{ backgroundColor: "lightGrey" }}
          className='board-card'
          onClick={this.openModal}>
          <Header
            as='h2'
            textAlign='center'
            style={{
              color: 'white',
              textShadow: '1px 1px 1px black',
            }}>
            + Add Board
          </Header>
        </div>

        <Modal
          onClose={this.closeModal}
          open={showModal}
          size='mini'>
          <Modal.Header>
            Add Board
          </Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <label htmlFor='name'>
                  Board
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
              <Form.Field>
                <label htmlFor='background_image'>
                  Background Image (optional)
                </label>
                <Form.Input
                  type='text'
                  name='background_image'
                  placeholder="Image URL"
                  onChange={this.handleChange}/>
              </Form.Field>
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
      </div>
    )
  }
}

export default connect(null, { addingNewBoard })(EmptyBoardCard)


EmptyBoardCard.defaultProps = {
  reservations: [{start: '', end:'', title: ''}]
}

EmptyBoardCard.propTypes = {
  reservations: PropTypes.array,
  selectingTimeSlot: PropTypes.func
}
