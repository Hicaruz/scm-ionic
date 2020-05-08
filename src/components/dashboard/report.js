import React, { Component } from 'react'
import * as firebase from "firebase/app";

class Report extends Component {

    constructor() {
        super()
        this.state = {
            checks: []
        }
    }

    async componentDidMount() {
        const db = firebase.firestore()
        const { docs } = await db.collection("checks").get()
        const checks = docs.map(doc => doc.data())
        this.setState({ checks })
    }

    render() {
        return (
            <>
                <div className="container">
                    <h1 align="center" style={{ color: "#FFF" }}>Report</h1>
                    <div className="row">
                        <div className="col-lg-12 col-xl-12 mx-auto">
                            <div className="card card-signin flex-row my-1">
                                <div className="d-none d-md-flex">
                                </div>
                                <div className="card-body">
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

}

export default Report