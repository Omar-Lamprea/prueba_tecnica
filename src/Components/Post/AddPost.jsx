import { Container } from 'react-bootstrap'
import './AddPost.scss'
import { useState } from "react"
import { addNewPost } from '../../Services/addPost'
import { useContextGlobal } from '../../Context/global.context'


const AddPost = () => {
  const {state, dispatch} = useContextGlobal()
  const initialData = {
    title: '',
    body: '',
    userId: 1,
  }
  const [postTemplate, setPostTemplate] = useState(initialData)

  const handleSubmit = async (e) =>{
    e.preventDefault()
    if(postTemplate.body.length > 0 && postTemplate.title.length > 0 ){
      const res = await addNewPost(state.api, postTemplate)
      if(res?.id){
        const newList = [...state.post]; 
        newList.unshift(res)
        dispatch({
          type: 'setPost', 
          payload:  newList
        })
        setPostTemplate(initialData)
      }
    }
  }

  const handleChange = (e) =>{
    e.target.name === 'title'
      ? setPostTemplate({...postTemplate, title: e.target.value})
      : setPostTemplate({...postTemplate, body: e.target.value})

    const btn = document.getElementById('btn')
    if(postTemplate.body.length > 0 && postTemplate.title.length > 0 ){
      btn.removeAttribute('disabled')
    }else{
      btn.setAttribute('disabled', "")
    }
  }

  return (
    <Container>
      <form className="form_add_post" onSubmit={handleSubmit}>
        <input 
          onChange={handleChange} 
          type="text" 
          placeholder="Posts title..." 
          name="title"
          value={postTemplate.title}
        />

        <textarea 
          onChange={handleChange} 
          placeholder="What´s happening?..."
          name="body"
          value={postTemplate.body}
        ></textarea>
        <button disabled id='btn'>Add post</button>
      </form>
    </Container>
  )
}

export default AddPost