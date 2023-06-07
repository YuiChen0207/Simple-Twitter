// -- style
import './Main.scss'
// -- component

const Main = () => {
  return (
    <div className="mainContainer">
      <Navbar />
      <Headers />
      <Post />
      <Tweets />
    </div>
  )
}

export default Main
