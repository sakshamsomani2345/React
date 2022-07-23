import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Banner from './components/Banner';
import Favourite from './components/Favourite';
import Movies from './components/Movies';
import Navbar from './components/Navbar';
function App() {
  return (
    <>
     {/* <Navbar/> */}
     {/* <Banner/>
     <Movies/> */}
     {/* <Favourite/> */}
     <BrowserRouter>
     <Navbar/>
      <Routes>
        <Route path="/" element={<Movies />}>
        </Route>
        <Route  exact path="/favourite" element={<Favourite/>}>
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
