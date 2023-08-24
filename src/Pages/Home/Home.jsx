import AddPost from "../../Components/Post/AddPost"
import Post from "../../Components/Post/Post"
import './Home.scss'

const Home = () => {
  return (
    <section className="home d-flex flex-column">
      <AddPost />
      <Post />
    </section>
  )
}

export default Home