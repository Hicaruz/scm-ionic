import React, { Component } from 'react'
import './login.css'
class Login extends Component {
    constructor() {
        super()
        this.state = {
            username: "",
            password: ""
        }
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange({ target }) {
        const { name, value } = target
        this.setState({
            [name]: value
        })
    }
    render() {
        return (
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 col-xl-9 mx-auto">
                            <div className="card card-signin flex-row my-5">
                                <div className="card-img-left d-none d-md-flex">
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title text-center">
                                        <div>
                                            <h1><b>SCM</b></h1>
                                            <img
                                                width="100%"
                                                className="logo"
                                                src="https://firebasestorage.googleapis.com/v0/b/scm-capsa.appspot.com/o/assets%2Fcapsa%203.png?alt=media&token=e00528e5-8379-4663-b6a8-2ee70b37936e"
                                                alt="logo" />
                                        </div>
                                    </h5>
                                    <div className="form-signin">
                                        <div className="form-group">
                                        <span>Username</span>

                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="..."
                                                name="username"
                                                onChange={this.handleChange}
                                                required />
                                        </div>
                                        <div className="form-group">
                                        <span>Password</span>

                                            <input
                                                type="password"
                                                className="form-control"
                                                placeholder="..."
                                                name="password"
                                                onChange={this.handleChange}
                                                required />
                                        </div>
                                        <button
                                            className="btn btn-lg btn-primary btn-block text-uppercase"
                                            onClick={() => {
                                                const { username, password } = this.state
                                                const email = `${username}@capsa.com`
                                                this.props.login(email.trim(), password.trim())
                                            }}>Login</button>
                                        <hr />

                                        <button type="button" className="btn btn-warning btn-block" data-toggle="modal" data-target="#exampleModalLong">
                                            Terminos y condiciones
                                         </button>

                                        <div className="modal fade" id="exampleModalLong" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                                            <div className="modal-dialog" role="document">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title" id="exampleModalLongTitle">Terminos y condiciones</h5>
                                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                    <div className="modal-body">
                                                        ...
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-success" data-dismiss="modal">Close</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>

                {/* <div className="login-page">
                    <div className="form">
                        <div>
                            <h1><b>SCM</b></h1>
                            <img
                                className="logo"
                                src="https://firebasestorage.googleapis.com/v0/b/scm-capsa.appspot.com/o/assets%2Fcapsa%203.png?alt=media&token=e00528e5-8379-4663-b6a8-2ee70b37936e"
                                alt="logo" />
                        </div>
                        <br />
                        <input type="text" placeholder="username" name="username" onChange={this.handleChange} />
                        <input type="password" placeholder="password" name="password" onChange={this.handleChange} />
                        <button onClick={() => {
                            const { username, password } = this.state
                            const email = `${username}@capsa.com`
                            this.props.login(email.trim(), password.trim())
                        }}>login</button>
                    </div>
                </div> */}
            </>
        )
    }
}
export default Login