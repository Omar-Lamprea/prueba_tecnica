/* eslint-disable react-hooks/exhaustive-deps */

import { Container } from 'react-bootstrap'
import './Post.scss'
import Box from './Box'
import { useEffect, useState } from 'react'
import { useContextGlobal } from '../../Context/global.context'

const Post = () => {
  const {state} = useContextGlobal()
  const [postList, setPostList] = useState(false)

  useEffect(() =>{
    if(state.post.length > 0) setPostList(state.post)
  }, [state.post])

  return (
    <Container className='post_container'>
      {postList && postList.map((post)=> <Box key={post.id} data={post}/>)}
    </Container>
  )
}

export default Post