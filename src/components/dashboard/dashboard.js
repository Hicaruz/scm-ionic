import React, { Component } from 'react'
import AddCheck from './addCheck'
import History from './history'
import Report from './report'
import './dasboard.css'
class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            current: {}
        }
        console.log(props.user)
    }
    render() {
        return (
            <>



                <AddCheck
                    user={this.props.user}
                />
                <History
                    user={this.props.user}
                />

                {/* <button
                    data-testid="signin-anon"
                    onClick={() => {
                        this.props.logout()
                    }}
                >logout <i className="fas fa-check"></i>
                </button> */}
            </>
        )
    }

}
export default Dashboard