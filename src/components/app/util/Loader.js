import React, {Component} from 'react';
import './loader.css'

class Loader extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="lds-ellipsis">
                <div/>
                <div/>
                <div/>
                <div/>
            </div>
        )
    }

    componentDidMount() {
    }
}

export default Loader;