import React from 'react'
import $ from 'jquery';
import { Redirect } from 'react-router-dom'
import '../UserSignIn/Signin.css';
import Create from './Create'

class SignInCreator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isLoggedIn: false,
      sess: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    console.log('signInCreator componentdidmount')
    $.ajax({
      type: "GET",
      url: '/creator/signin/check',
      success: (res) => {
        console.log(res.sess)
        if (res.success) {
          this.setState({
            isLoggedIn: true,
            sess: res.sess
          })
        }
      }
    });
  }

  handleSubmit(event) {
    var obj = {
      email: this.state.email,
      password: this.state.password
    }
    $.ajax({
      type: "POST",
      url: '/creator/signin',
      data: {
        email: obj.email,
        password: obj.password
      },
      success: (res) => {
        alert(res.message)
        alert(res.sess)
        if (res.success) {
          this.setState({
            isLoggedIn: true,
            sess: res.sess
          })
        }
      }
    });
    event.preventDefault();
  }


  render() {
    if (this.state.sess) {
      return (
        <Create></Create>
      )
    } else {
      return (
        <div className="wrapper">
          <form className="form-signin" onSubmit={this.handleSubmit}>
            <h2 className="form-signin-heading">Event Manager login</h2>
            <input type="text" className="form-control" name="email" placeholder="Email Address" required="" autoFocus="" value={this.state.email} onChange={e => this.setState({ email: e.target.value })} />
            <input type="password" className="form-control" name="password" placeholder="Password" required="" value={this.state.password} onChange={e => this.setState({ password: e.target.value })} />
            <button className="btn btn-lg btn-primary btn-block" type="submit">Login</button>
          </form>
        </div>
      );
    }
  }
}
export default SignInCreator

/*
        <Redirect to={{
          pathname: '/creator',
        }}></Redirect>
        */