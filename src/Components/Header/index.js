import {withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import {AiFillHome} from 'react-icons/ai'
import {FiLogOut} from 'react-icons/fi'

import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const Header = props => {
  const onLogOut = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const renderHome = () => {
    const {history} = props
    history.replace('/')
  }

  const renderJobsBy = () => {
    const {history} = props
    history.replace('/jobs')
  }

  return (
    <div className="navbar-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        alt="website logo"
        className="navbar-logo-img"
        onClick={renderHome}
      />
      <div className="route-div-container">
        <p className="content" onClick={renderHome}>
          Home
        </p>
        <p className="content" onClick={renderJobsBy}>
          Jobs
        </p>
      </div>
      <button className="logout-button" type="button" onClick={onLogOut}>
        Logout
      </button>
      <div className="icons-container">
        <AiFillHome className="home-icon" size={25} onClick={renderHome} />
        <BsBriefcaseFill
          className="briefcase-icon"
          size={25}
          onClick={renderJobsBy}
        />
        <FiLogOut className="logout-icon" size={25} onClick={onLogOut} />
      </div>
    </div>
  )
}

export default withRouter(Header)
