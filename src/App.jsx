import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getDogs } from "./redux/actions/actions";
import './app.scss'

function App() {

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getDogs())
  },[])

  return (
    <div className="probando">
      <h1>Hola soy prueba</h1>
    </div>
  );
}

export default App;
