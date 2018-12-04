import React from 'react'
import $ from 'jquery';

class Signup extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      };


      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
      var obj = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
      }

      console.log(obj)
      $.ajax({
        type: "POST",
        url: '/account/signup',
        data: {
          firstName: obj.firstName,
          lastName: obj.lastName,
          email: obj.email,
          password: obj.password
        },
        success: function (res) {
          console.log(res)
          alert(res.message)
        }
      });

      event.preventDefault();
    }
    

  render() {
    return (
      <div id="zz" className="container-fluid" >
      <h2> Sign Up </h2>
      <form onSubmit={this.handleSubmit}>
        First Name : <input 
        placeholder="firstName"
        value={this.state.firstName}
        onChange={e=>this.setState({firstName:e.target.value})}/>
        <br></br>
        Last Name : <input 
        placeholder="lastname"
        value={this.state.lastName}
        onChange={e=>this.setState({lastName:e.target.value})}/>
        <br></br>
        Email : <input 
        placeholder="email"
        value={this.state.email}
        onChange={e=>this.setState({email:e.target.value})}/>
        <br></br>
        Password :<input 
        placeholder="password"
        value={this.state.password}
        type="password"
        onChange={e=>this.setState({password:e.target.value})}/>
        <br></br>
        <input type="submit" value="create" />
      </form>
      </div>
    );
  }
}
export default Signup

