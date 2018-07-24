import React, { Component } from 'react';
import {Redirect} from "react-router-dom";

class Callback extends Component {

    render() {
        return <Redirect to={'/recipes'}/>
    }


}

export default Callback;