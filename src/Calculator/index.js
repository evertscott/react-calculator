import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './index.css'

class Calculator extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: this.props.name
        }
    }

    changeName(){
        this.setState({
            name: "Guandre"
        })
    }

    render() {
        return (
            <div className={styles.buttonContainer}>
                <div className={styles.button} onClick={this.changeName.bind(this)}>
                    {this.state.name}
                </div>
            </div>
        );
    }
}

Calculator.propTypes = {
    name: PropTypes.string.isRequired
};

export default Calculator;