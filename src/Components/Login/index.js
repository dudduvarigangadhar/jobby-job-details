import Cookies from 'js-cookie'

import {Component} from 'react'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', ErrorMsg: '', showErrorMsg: false}

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = ErrorMsg => {
    this.setState({ErrorMsg, showErrorMsg: true})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  changeUsername = event => {
    this.setState({username: event.target.value})
  }

  changePassword = event => {
    this.setState({password: event.target.value})
  }

  renderLoginForm = () => {
    const {username, password, ErrorMsg, showErrorMsg} = this.state
    return (
      <div className="login-container">
        <div className="login-box-container">
          <div className="logo-img-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="login-logo-img"
            />
          </div>
          <div className="form-box-container">
            <form className="form-container" onSubmit={this.onSubmitForm}>
              <p className="field-content">USERNAME</p>
              <input
                type="text"
                placeholder="Username"
                className="username-input-field"
                value={username}
                onChange={this.changeUsername}
              />
              <p className="field-content">PASSWORD</p>
              <input
                type="password"
                value={password}
                onChange={this.changePassword}
                placeholder="Password"
                className="password-input-field"
              />
              <br />
              <button type="submit" className="login-button">
                Login
              </button>
              {showErrorMsg && <p className="error-msg">{ErrorMsg}</p>}
            </form>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return this.renderLoginForm()
  }
}

export default Login
