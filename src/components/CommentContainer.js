import React from 'react'
import { connect } from 'react-redux'
import { deletingComment } from '../redux/actions'

class CommentContainer extends React.Component {
  render(){
    return(
      <div>
      {this.props.project.comments.map( comment => (
        <div key={"comment" + comment.id}>
          {comment.content}
          <button onClick={() => this.props.deletingComment(comment, this.props.project)}> Delete </button>
        </div>
      ))}
      </div>
    )
  }
}

export default connect(null, { deletingComment })(CommentContainer)
