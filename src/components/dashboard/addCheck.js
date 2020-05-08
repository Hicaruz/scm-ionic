
import React, { Component } from 'react'
import './addCheck.css'
import * as firebase from "firebase/app";

class AddCheck extends Component {
    constructor() {
        super()
        this.state = {

            gondolLoaded: 0,
            impulse: 0,
            newSupermarket: "",
            supermarket: "",
            stock: "",
            check: false,
            radio: false,
            stateStock: false,
            files: [],
            supermarkets: [],
            current: {},
            location: {}
        }
        this.onLoaded = this.onLoaded.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.checkIn = this.checkIn.bind(this)
        this.checkOut = this.checkOut.bind(this)
        this.getLatLon = this.getLatLon.bind(this)
        this.addPlace = this.addPlace.bind(this)

    }
    async componentDidMount() {
        await this.updateSupermarkets();

    }
    async updateSupermarkets() {
        const db = firebase.firestore();
        const { docs } = await db.collection("supermarkets").get();
        const supermarkets = docs.map(doc => doc.data());
        this.setState({ supermarkets });
    }

    getLatLon(position) {

        const { longitude, latitude } = position.coords
        this.setState({ location: { longitude, latitude } })
    }
    onLoaded({ target }) {
        const { files, name } = target;
        for (const _file of files) {
            this.setState({ files: [_file, ...this.state.files] })
        }
        this.setState({ [name]: this.state[name] + 1 })
    }
    handleChange({ target }) {
        const { name, value } = target
        this.setState({
            [name]: value
        })
    }
    async checkIn() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.getLatLon);
        } else {
            return;
        }
        const db = firebase.firestore()
        const check = {
            inLocation: this.state.location,
            supermarket: this.state.supermarket,
            date: new Date(),
            owner: this.props.user.uid,
            state: "pending"
        }
        const { id } = await db.collection("checks").add(check)
        this.setState({ check: true, current: { ...check, id } })
    }
    async checkOut() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.getLatLon);
        } else {
            return;
        }
        const storage = firebase.storage().ref()
        const db = firebase.firestore()
        const images = []
        const { id } = this.state.current
        let n = 0
        for (const _file of this.state.files) {
            const reference = storage.child(`/pictures/${this.props.user.uid}/${id}/${++n}.jpg`);
            const file = await reference.put(_file);
            const image = await file.ref.getDownloadURL()
            images.push(image)
        }
        const update = {
            outLocation: this.state.location,
            images: images,
            state: "finished",
            hasImpulse: this.state.radio.length ? true : false,
            healthyStock: this.state.stock || false
        }
        db.collection("checks").doc(id).update(update).then(() => window.location.reload(false))
    }
    async addPlace() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.getLatLon);
        } else {
            return;
        }
        const db = firebase.firestore()
        const place = {
            name: this.state.newSupermarket,
            location: this.state.location
        }
        const doc = await db.collection("supermarkets").add(place)
        await this.updateSupermarkets();

    }
    render() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.getLatLon);
        }

        return (
            <div className="container" >
                <div className="row">
                    <div className="col-lg-10 col-xl-9 mx-auto">
                        <div className="card card-signin flex-row my-4">
                            <div className="card-img-left d-none d-md-flex">
                            </div>
                            <div className="card-body">
                                <div className="form-signin">
                                    <button className="btn btn-lg btn-warning btn-block text-uppercase" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">
                                        Add Check
                            </button>
                                </div>
                            </div>
                            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-body">
                                            <div className="form-group">
                                                <label htmlFor="recipient-name" className="col-form-label">Selecciona un supermecado</label>

                                                {
                                                    this.startCheck()
                                                }
                                            </div>
                                            <div className="modal-footer">
                                                <button className="btn btn-warning" type="button" data-toggle="modal" data-target="#place" data-whatever="@mdo">Añadir lugar</button>
                                                {
                                                    this.state.supermarket.length ?
                                                        this.state.check ?
                                                            <button type="button" className="btn btn-success" onClick={this.checkIn} disabled>Check-in</button> :
                                                            <button type="button" className="btn btn-success" onClick={this.checkIn}>Check-in</button> :
                                                        <button type="button" className="btn btn-success" disabled>Check-in</button>
                                                }
                                            </div>
                                            <hr />
                                            {
                                                this.state.check ?
                                                    this.pogressForm() :
                                                    null
                                            }

                                        </div>
                                        {
                                            this.state.check ?
                                                <div className="modal-footer">
                                                    {
                                                        this.state.files.length >= 2 ?
                                                            <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={this.checkOut}>Check-out</button>
                                                            : <button type="button" className="btn btn-danger" data-dismiss="modal" disabled>Check-out</button>

                                                    }
                                                </div>
                                                : null
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="modal fade" id="place" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-body">
                                            <div className="form-group">
                                                <label htmlFor="recipient-name" className="col-form-label">Nombre supermercado:</label>

                                                <input type="text" name="newSupermarket" className="form-control" id="recipient-name" onChange={this.handleChange} autoFocus />
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-danger" data-dismiss="modal">Cancelar</button>
                                                    <button type="button" className="btn btn-warning" data-dismiss="modal" onClick={this.addPlace}>Añadir</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div >

        )
    }

    startCheck() {
        return this.state.check ?
            <select class="custom-select" name="supermarket" onChange={this.handleChange} disabled>
                <option selected>aqui...</option>
                {this.state.supermarkets.map((supermarket, key) => {
                    return (<option value={supermarket["name"]} key={key}>{supermarket["name"]}</option>);
                })}

            </select> :
            <select class="custom-select" name="supermarket" onChange={this.handleChange}>
                <option selected>aqui...</option>
                {this.state.supermarkets.map((supermarket, key) => {
                    return (<option value={supermarket["name"]} key={key}>{supermarket["name"]}</option>);
                })}

            </select>;
    }

    pogressForm() {
        return <>
            <div align="center">
                <h4>fotos de gondola {this.state.gondolLoaded > 2 ? 2 : this.state.gondolLoaded}/2</h4>

                <div className="row">
                    {[...Array(2)].map((_, key) => (<div className="col block" key={key}>
                        <label htmlFor="file-upload" className="custom-file-upload">
                            <i className="fa fa-cloud-upload"></i> {!key ? "frente" : "atras"}
                        </label>
                        <input id="file-upload" type="file" accept="image/*" name="gondolLoaded" className="form-control form-control-file" placeholder="frente" capture="camera" onChange={this.onLoaded} />
                    </div>))}
                </div>
            </div>
            <hr />
            <div>
                <div align="center">
                    <h4>Impulsadora</h4>
                    {[...Array(2)].map((_, key) => (<div className="form-check form-check-inline" key={key}>
                        <input className="form-check-input" type="radio" name="radio" value={!key ? "true" : ""} onChange={this.handleChange} />
                        <label className="form-check-label" htmlFor="inlineRadio1">{!key ? "si" : "no"}</label>
                    </div>))}
                </div>
                {this.state.radio.length ?
                    <div align="center">
                        <h4>fotos de Impulsadora</h4>

                        <div className="row">
                            {[...Array(2)].map((_, key) => (<div className="col block" key={key}>
                                <label htmlFor="file-upload" className="custom-file-upload">
                                    <i className="fa fa-cloud-upload"></i> {key + 1}
                                </label>
                                <input id="file-upload" type="file" name="impulse" accept="image/*" className="form-control form-control-file" placeholder="frente" capture="camera" />
                            </div>))}
                        </div>
                    </div> :
                    null}
            </div>
            <div>
                <div align="center">
                    <h4>Inventario sano</h4>
                    {[...Array(2)].map((_, key) => (<div className="form-check form-check-inline" key={key}>
                        <input className="form-check-input" type="radio" name="stateStock" value={key ? "true" : ""} onChange={this.handleChange} />
                        <label className="form-check-label" htmlFor="inlineRadio1">{!key ? "si" : "no"}</label>
                    </div>))}
                </div>
                {this.state.stateStock.length ?
                    <div align="center">
                        <textarea name="stock" onChange={this.handleChange} placeholder={"chuleta, chorizo".replace(/,/g, ",\n")}></textarea>
                    </div> :
                    null}
            </div>

        </>;
    }
}
export default AddCheck