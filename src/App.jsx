import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getDogs } from "./redux/actions/actions";
import './app.scss'
import { Login } from "./components/login/Login";
import { Route, Routes } from "react-router-dom";
import { Home } from "./components/home/Home";


function App() {

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getDogs())
  },[])

  return (
    <div >
      <Routes>
        <Route exact path="/" Component={Login}/>
        <Route path="/home" Component={Home}/>
      </Routes>
    </div>
  );
}

export default App;
