import { Link } from 'react-router-dom'
import '../../app.scss'


export function Home() {
  return (
    <div className='home'>
      <h1>Soy un Home</h1>
      <Link to="/">
        <p>Volver al login</p>
      </Link>
    </div>
  )
}