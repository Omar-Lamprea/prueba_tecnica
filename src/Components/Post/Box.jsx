/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import avatar from '../../assets/avatar.avif'
import { useContextGlobal } from '../../Context/global.context'
import ModalEdit from '../modal/ModalEdit'
import Comments from './Comments'
import messageIcon from '../../assets/chat-dots.svg'
import { deletePostId } from '../../Services/deletePost'
import { getPostComments } from '../../Services/getPostComments'
import { getUser } from '../../Services/getUser'


const Box = ({data}) => {
  const {state, dispatch} = useContextGlobal()
  const [userData, setUserData] = useState(false)
  const [comments, setComments] = useState(false)

  const getUserPost = async(userId) =>{
    const {api} = state
    
      const user = await getUser(api, userId)
      if(user){
        setUserData(user)
      }
  }

  const deletePost = async () => {
    if(deletePostId){
      const postList = state.post
      const newList = postList.filter((post => post.id !== data.id))
      dispatch({
        type: 'setPost', 
        payload:  newList
      })
    }else{
      alert('error eliminando')
    }
  }

  const getComments = async () => {
    if(comments){
      setComments(false)
    }else{
      const APIdata = await getPostComments(state.api, data.id)
      if(APIdata){
        setComments(APIdata)
      }
    }
  }

  useEffect(() =>{
    getUserPost(data.userId)
  },[])

  return (
    <section className='box'>
        <figure className='box_user_image'>
          <img src={avatar} alt="user avatar" />
        </figure>

        <div className="box_data">
          <div className="box_data_user">
            {userData &&
              <>
                <h4>{userData.name}</h4>
                <button className='delete' onClick={deletePost}>
                  <p>X</p>
                </button>
              </>
            }
          </div>

          <div className="box_data_content">

            <strong className="post_title" id={"postTitle" + data.id}>
              {data.title}
            </strong>

            <p id={"postBody" + data.id}>{data.body}</p>
          </div>

          <div className="box_data_actions">
            <span className='me-2' onClick={getComments}>
              <img src={messageIcon} alt="" />
            </span>
            <ModalEdit data={data}/>
          </div>

        {comments && 
          <>
          <p className='my-2'><strong>Comments:</strong></p>
          {comments.map((comment => 
            <Comments 
              key={comment.postId + comment.id} 
              data={comment}/>
          ))}
          </>
        }
        </div>
      </section>
  )
}

export default Box