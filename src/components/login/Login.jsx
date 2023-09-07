import { useNavigate } from 'react-router-dom'
import '../../app.scss'

export function Login() {

  const navigate = useNavigate()

  function irAlHome(e){
    e.preventDefault();
    navigate("/home")
  }

  return (
    <div className='container'>
      <form className='form-container' onSubmit={irAlHome}>
        <div className='input-log'>
          <label htmlFor="">Usuario</label>
          <input type="text" className='input-style'/>
        </div>
        <div className='input-log'>
          <label htmlFor="">Contraseña</label>
          <input type="text" className='input-style'/>
        </div>
        <div className='container-btn'>
          <input type="submit" value="Ingresar" className='btn-style'/>
        </div>
      </form>
    </div>
  )
}