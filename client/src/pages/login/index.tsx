import * as React from 'react';
import './style.less';
import { ILoginState } from '../../types'

class Login extends React.Component<object, ILoginState> {
  constructor(props: object) {
    super(props)
    this.state = {
      userMail: '',
      password: ''
    } 
    this.handleMailChange = this.handleMailChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }
  public render() {
    return (
      <div className='login'>
        <div className='login-container'>
					<div className='login-logo' />
          <div className='login-form'>
            <input placeholder='邮箱' 
              onChange={this.handleMailChange}
            />
            <input placeholder='密码'
              onChange={this.handlePasswordChange}
            />
            <button className='login-btn' 
              onClick={this.handleLogin}
            >登录</button>
          </div>
        </div>
      </div>
    )
  }
  private handleMailChange (e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      userMail: e.target.value
    })
  }
  private handlePasswordChange (e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      password: e.target.value
    }) 
  }
  private handleLogin () {
    const {userMail, password} = this.state
    setTimeout(() => {
      console.log(userMail, password);
    }, 2000)
  }
}

export default Login