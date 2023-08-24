/* eslint-disable react/prop-types */
import './Comments.scss'
const Comments = ({data}) => {
  return (
    <div className="comments">
      <p className='email'>{data.email}:</p>
      <p className='body'>{data.body}</p> <br />
    </div>
  )
}

export default Comments