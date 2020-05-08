import React, { Component } from 'react'
import * as firebase from "firebase/app";

import './dasboard.css'

class History extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: this.props.user,
            checks: []
        }
    }
    async componentDidMount() {
        const db = firebase.firestore()
        const { docs } = await db.collection("checks").where("owner", "==", this.state.user.uid).get()
        const checks = docs.map(doc => doc.data())
        this.setState({ checks })
    }
    timeConverter(UNIX_timestamp) {
        const a = new Date(UNIX_timestamp * 1000);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const year = a.getFullYear();
        const month = months[a.getMonth()];
        const date = a.getDate();
        const hour = a.getHours();
        const min = a.getMinutes();
        const sec = a.getSeconds();
        const time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
        return time;
    }
    render() {
        return (
            <div className="container histoy">
                <h1 align="center" style={{ color: "#FFF" }}>Checks</h1>
                <div className="row">
                    {
                        this.state.checks.map((check, key) => {
                            return (
                                <div className="col-lg-10 col-xl-9 mx-auto" key={key}>
                                    <div className="card card-signin flex-row my-1">
                                        <div className="d-none d-md-flex">
                                        </div>
                                        <div className="card-body">
                                            <div className="form-signin">
                                                <p>
                                                    <b>supermercado</b>: {check.supermarket}
                                                </p>
                                                <p>
                                                    <b>fecha</b>: {this.timeConverter(JSON.stringify(check.date.seconds))}
                                                </p>
                                                <p>
                                                    <b>estado</b>: {check.state !== "pending" ? "📗" : "📙"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
        )
    }
}

export default History