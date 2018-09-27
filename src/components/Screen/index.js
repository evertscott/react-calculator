import React, { Component } from 'react';
import styles from './index.css'

class Screen extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <textarea readOnly maxLength='15' className={styles.screen}/>
        );
    }
}

export default Screen;