import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getDogs } from "./redux/actions/actions";


function App() {

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getDogs())
  },[])

  return (
    <>
      <h1>Hola soy prueba</h1>
    </>
  );
}

export default App;
