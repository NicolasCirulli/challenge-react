import { Link } from "react-router-dom";
import './Navbar.css'
const Navbar = () => {
  return (
    <header className='navbar'>
        <img className="logo" src="/images/logo.svg"/>
        <nav className="nav__menu">
            <Link className="nav__links" to="/schedule"><img className="icon__links" src="/images/schedule.png"/>Schedule</Link>
            <Link className="nav__links" to="/leaderboard"><img className="icon__links" src="/images/leaderboard.png"/>leaderboard</Link>
        </nav>
    </header>
  )
}

export default Navbar