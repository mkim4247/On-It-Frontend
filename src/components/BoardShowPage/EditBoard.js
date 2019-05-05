import React from 'react'
import { connect } from 'react-redux'
import { Header, Form, Button, Card } from 'semantic-ui-react'
import { editingBoard } from '../../redux/actions'

class EditBoard extends React.Component {

  state = {
    id: this.props.board.id,
    name: this.props.board.name,
    description: this.props.board.description,
    background_image: this.props.board.background_image,
    type: this.props.board.type
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.editingBoard(this.state)
    this.props.closeEdit()
  }

  render(){
    return(
      <Card.Content>
        <Card.Content>
          <Header as='h3' textAlign='center'>
            Edit Board Info:
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
                <label htmlFor='name'>
                  Background Image
                </label>
                <Form.Input
                  type='text'
                  name='background_image'
                  placeholder='Image URL'
                  value={this.state.background_image}
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
      </Card.Content>
    )
  }
}

export default connect(null, { editingBoard })(EditBoard)
