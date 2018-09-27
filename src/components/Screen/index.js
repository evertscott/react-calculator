import React, { Component } from 'react';
import styles from './index.css'
let classNames = require('classnames');

class Screen extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <textarea readOnly maxLength='15' className={classNames(styles.screen, "js-screen")}/>
        );
    }
}

export default Screen;