import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./public/Home";
import Clubs from "./public/Clubs";
import Events from "./public/Events";
import About from "./public/About";
import Navbar from "./widgets/Navbar";
import Footer from "./widgets/Footer";
import SignIn from "./public/SignIn";


function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/clubs" element={<Clubs/>}/>
          <Route path="/events" element={<Events/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/signin" element={<SignIn/>}/>
        </Routes>
        <Footer/>
      </Router>
      </>
  )
}

export default App
