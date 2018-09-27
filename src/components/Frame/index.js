import React, { Component } from 'react';
import styles from './index.css'
import Screen from '/components/Screen'
import Buttons from '/components/Button'

class Frame extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className={styles.frame}>
                <Screen/>
                <Buttons/>
            </div>
        );
    }
}

export default Frame;