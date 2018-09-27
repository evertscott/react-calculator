import React, { Component } from 'react'
import styles from './index.css'
import $ from "jquery"
import numeral from 'numeral'
let classNames = require('classnames')

class Buttons extends Component {
    constructor(props){
        super(props);
    }

    calculate(value1, value2, calcType){
        let val1 = numeral(value1).value()
        let val2 = numeral(value2).value()
        let calcValue = (calcType == '+')? val1 + val2 : (calcType == '-')? val1 - val2 : (calcType == '×')? val1 * val2 : val1 / val2
        let calcString = calcValue.toString()
        return numeral(calcString).format('0,0.[0000000000000000000000000]')
    }
    
    cleanSessionStorage(){
        console.log("Clean")
        sessionStorage.removeItem('value')
        sessionStorage.removeItem('type');
        sessionStorage.removeItem('prevValue')
        sessionStorage.removeItem('prevType');
    }

    clickButton(text) {
        let screenVal = $('.js-screen').val();
        console.log("Screen: " + screenVal)
        if(text == '+' || text == '-' || text == '×' || text == '÷'){
            if(sessionStorage.getItem('value') == null || sessionStorage.getItem('type') == null){
                sessionStorage.setItem('value', screenVal);
                sessionStorage.setItem('type', text);
                sessionStorage.setItem('clean','true')
    
            } else {
                let def = (text == '×' || text == '÷')? "1" : "0";
                let val1 = sessionStorage.getItem('value');
                let clean = sessionStorage.getItem('clean')
                let val2 = (clean == 'true')? def : screenVal;
                let calcType = sessionStorage.getItem('type');
                let newValue = (calcType == '=' || clean == 'true')? val1: this.calculate(val1, val2, calcType);
                sessionStorage.setItem('value', newValue);
                sessionStorage.setItem('type', text);
                sessionStorage.setItem('clean', 'true');
                $('.js-screen').val(newValue);
            }
    
        } else if (text == '='){
            if(sessionStorage.getItem('value') == null || sessionStorage.getItem('type') == null){
                $('.js-screen').val(numeral(screenVal).format('0,0.[0000000000000000000000000]'))
    
            } else {
                let val1 = sessionStorage.getItem('value')
                let val2 = screenVal
                let calcType = sessionStorage.getItem('type')
                if(calcType == '='){
                    let prevType = sessionStorage.getItem('prevType')
                    let prevValue = sessionStorage.getItem('prevValue')
                    let newValue = this.calculate(screenVal, prevValue, prevType);
                    sessionStorage.setItem('value', newValue);
                    sessionStorage.setItem('type', text);
                    sessionStorage.setItem('clean', 'true');
                    $('.js-screen').val(newValue)
                    
                } else {
                    sessionStorage.setItem('prevType', calcType)
                    sessionStorage.setItem('prevValue', val2)
                    let newValue = this.calculate(val1, val2, calcType);
                    sessionStorage.setItem('value', newValue);
                    sessionStorage.setItem('type', text);
                    sessionStorage.setItem('clean', 'true');
                    $('.js-screen').val(newValue)
                }
            }
    
        } else if (text == 'AC') {
            this.cleanSessionStorage();
            $('.js-screen').val("");
    
        } else if (text == 'C') {
            $('.js-screen').val("");
            if(sessionStorage.getItem('type') === '='){
                this.cleanSessionStorage();
            }
    
        } else if (text == '±') {
            if(screenVal === "" || sessionStorage.getItem('clean') === 'true'){
                $('.js-screen').val('-')
                sessionStorage.setItem('clean','false');
                if(sessionStorage.getItem('type') === '='){
                    this.cleanSessionStorage();
                }
    
            } else {
                if(screenVal.startsWith('-')) {
                    $('.js-screen').val(screenVal.replace('-',''))
                } else {
                    $('.js-screen').val('-' + screenVal)
                }
    
            }
    
        } else {
            if(screenVal === "" || sessionStorage.getItem('clean') === 'true'){
                console.log("Hello1")
                let value = (text == '.')? '0.' : text
                console.log(value)
                $('.js-screen').val(value)
                sessionStorage.setItem('clean','false');

                if(sessionStorage.getItem('type') === '='){
                    this.cleanSessionStorage();
                }
            
            } else if(screenVal.length < 19){
                if(text == '.'){
                    if(!screenVal.includes('.')){
                        $('.js-screen').val(screenVal + '.')
                    }
    
                } else if (screenVal == '-'){
                    $('.js-screen').val('-' + text)
    
                } else if (screenVal.includes('.')){
                    $('.js-screen').val(screenVal + text)
    
                } else {
                    console.log("Hello")
                    let value = (screenVal.endsWith('.'))? numeral(screenVal).value().toString() + '.': numeral(screenVal).value().toString()
                    let newValue = value + text
                    $('.js-screen').val(numeral(newValue).format('0,0.[0000000000000000000000000]'))
                }
            }
        }
        
    }

    render() {
        const generalButtons = ['AC','C','±','7','8','9','4','5','6','1','2','3','0','.','='].map(item => 
            <button key={item} className={classNames(styles.button, styles.notplus)} onClick={this.clickButton.bind(this, item)}>{item}</button>
        )

        const actionButtons = ['÷', '×','-','+'].map(item => 
            (item === '+')?
                <button key={item} className={classNames(styles.button, styles.plus)} onClick={this.clickButton.bind(this, item)}>{item}</button>
            :
                <button key={item} className={classNames(styles.button, styles.notplus)} onClick={this.clickButton.bind(this, item)}>{item}</button>
        )


        return (
            <div className={styles.buttons}>
                <div className={styles.general}>
                    {generalButtons}
                </div>
                <div className={styles.actions}>
                    {actionButtons}
                </div>
            </div>
        );
    }
}

export default Buttons;