import main from '../assets/images/main.svg'
import Wrapper from '../assets/wrappers/LandingPage'
import { Logo } from '../components'
import { Link } from 'react-router-dom'
const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className='container page'>
        {/* info */}
        <img src={main} alt='image' className='img main-img' />
        <div className='info'>
          <h1>
            sales <span>tracking</span> app
          </h1>
          <p>
          If you believe in what you are doing, then let nothing hold you up in your work. Much of the best work of the world has been done against seeming impossibilities. The thing is to get the work done
          </p>
          <Link to='/register' className='btn btn-hero'>
            Login/Register
          </Link>
        </div>
        
      </div>
    </Wrapper>
  )
}

export default Landing
