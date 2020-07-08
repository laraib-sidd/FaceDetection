import React, { Component } from 'react';

class Register extends Component{
    constructor(props){
        super(props);
        this.state = {
            RegisterName:'',
            RegisterEmail:'',
            RegisterPassword:''
        }
    }
    onNameChange = (event) =>{
        this.setState({RegisterName:event.target.value})
    }
    onEmailChange = (event) => {
        this.setState({RegisterEmail:event.target.value})
    }

    onPasswrodChange = (event) => {
        this.setState({RegisterPassword:event.target.value})
    }

    onSumbitChange = () =>{
        fetch('http://localhost:3018/register',{
            method:'post',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                email : this.state.RegisterEmail,
                passsword: this.state.RegisterPassword,
                name: this.state.RegisterName
            })
        })
        .then(res => res.json())
        .then(user =>{
            console.log(user);
            if (user){
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            }
        })

    }
    render(){
    return(
    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
    <main className="pa4 black-80">
        <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f1 fw6 ph0 mh0 center">Register</legend>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                    <input onChange={this.onNameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name" />
                </div>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                    <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
                </div>
                <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                    <input onChange={this.onPasswrodChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
                </div>
            </fieldset>
            <div className="">
                <input onClick={this.onSumbitChange} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register" />
            </div>
            </div>
    </main>
    </article>
    );
}}

export default Register;