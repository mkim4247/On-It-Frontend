import React from 'react'
import { connect } from 'react-redux'
import { Card, Comment, Header, Form, Modal, Button } from 'semantic-ui-react'
import { deletingComment, postingNewComment } from '../../redux/commentActions'
import PropTypes from 'prop-types';

class CommentContainer extends React.Component {

  state = {
    content: "",
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
    this.props.postingNewComment(this.state, this.props.project)
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

  deleteComment = (comment) => {
    let confirm = window.confirm("Are you sure you want to delete this comment?")

    if(confirm){
      this.props.deletingComment(comment, this.props.project)
    }
  }

  render(){
    const { showModal } = this.state

    return(
      <div>
        <Card fluid>
          <Card.Content>
            <Comment.Group>
              <Header as='h5' dividing>
                Comments
              </Header>
              {this.props.project.comments.map( comment => (
                <Comment key={`comment-${comment.id}-${this.props.project.id}`}>
                  <Comment.Content>
                    {this.props.project.type === "team" ?
                      <Comment.Author>
                        {`${comment.user.first_name} ${comment.user.last_name}`}
                      </Comment.Author>
                      :
                      null
                    }
                    <Comment.Metadata>
                      {comment.created_at}
                    </Comment.Metadata>
                    <Comment.Text>
                      {comment.content}
                    </Comment.Text>
                      {comment.user.username === this.props.user.username ?
                        <Header
                          textAlign='right'
                          style={{margin: '0px'}}>
                          <Button
                            color='red'
                            onClick={() => this.deleteComment(comment)}>
                            Delete
                          </Button>
                        </Header>
                        : null
                      }
                    </Comment.Content>
                  </Comment>
                ))
              }
            </Comment.Group>
            <Card.Content>
              <Button
                onClick={this.openModal}
                fluid
                color='teal'>
                + Add Comment
              </Button>
            </Card.Content>
          </Card.Content>
        </Card>

        <Modal
          open={showModal}
          onClose={this.closeModal}
          size='mini'>
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <Header
                  as='h5'
                  textAlign='center'>
                  Add Comment
                </Header>
                <Form.TextArea
                  type="text"
                  onChange={this.handleChange}
                  name="content"
                  placeholder="Write a comment..."/>
              </Form.Field>
              <Button
                type="submit"
                fluid
                color='teal'>
                Submit
              </Button>
            </Form>
          </Modal.Content>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { deletingComment, postingNewComment })(CommentContainer)
