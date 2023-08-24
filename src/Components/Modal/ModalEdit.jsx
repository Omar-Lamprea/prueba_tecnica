/* eslint-disable react/prop-types */
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { addNewPost } from '../../Services/addPost';
import { useContextGlobal } from '../../Context/global.context';
import './ModalEdit.scss'
import EditIcon from '../../assets/pencil.svg'

const ModalEdit = ({data}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  const {state} = useContextGlobal()
  const [postTemplate, setPostTemplate] = useState({
    title: data.title,
    body: data.body,
    userId: 1,
  })

  const handleSubmit = async (e) =>{
    e.preventDefault()
    if(postTemplate.body.length > 0 && postTemplate.title.length > 0 ){
      const res = await addNewPost(state.api, postTemplate, "PUT", data.id)
      if(res?.id){

        const postTitle = document.getElementById('postTitle' + data.id)
        const postBody = document.getElementById("postBody" + data.id)

        postTitle.innerHTML = postTemplate.title
        postBody.innerHTML = postTemplate.body
        handleClose()
      }
    }
  }

  const handleChange = (e) =>{
    e.target.name === 'title'
      ? setPostTemplate({...postTemplate, title: e.target.value})
      : setPostTemplate({...postTemplate, body: e.target.value})
  }


  return (
    <>
      <span onClick={handleShow}>
        <img src={EditIcon} alt="" />
      </span>

      <Modal show={show} onHide={handleClose} centered className='modal_edit'>
        <Modal.Header closeButton>
          <Modal.Title>Edit post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="editForm" onSubmit={handleSubmit}>
            <input 
              onChange={handleChange} 
              type="text" 
              placeholder="title posts..." 
              name="title"
              value={postTemplate.title}
            />

            <textarea 
              onChange={handleChange} 
              placeholder="type a post"
              name="body"
              value={postTemplate.body}
            ></textarea>
            <button id='btn'>Edit post</button>
        </form>
        </Modal.Body>
        
      </Modal>
    </>
  )
}

export default ModalEdit