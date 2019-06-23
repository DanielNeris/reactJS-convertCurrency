import React, { Component } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

import './styles.css';

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: 0,
            moedaB_valor: 0
        };

        this.convertCurrency = this.convertCurrency.bind(this);
    }

 
    componentDidMount() {
        this.convertCurrency();
    }

    convertCurrency = async () => {
        const api_key = '5b5090e438ac08f4a749';
        
        const response = await api.get(`/convert?q=USD_BRL&compact=ultra&apiKey=${api_key}`);
        
        const account = response.data.USD_BRL;

        let qtd = document.getElementById('moedaA').value;

        if(qtd === "")
            qtd = 1;
        
        this.setState({ 
            account: account.toFixed(2),
            moedaB_valor: (account * parseFloat(qtd)).toFixed(2)
        });       
    }

    render() {
        const { moedaB_valor, account } = this.state;

        return (
            <div className="convert">
                <h2>USA for BRL</h2>
                informe o valor da moeda A: <input id="moedaA" type="text" onKeyUp={this.convertCurrency}></input>
                <p>contação do dia: {account}</p>
                <p>total: {moedaB_valor}</p>
            </div>
        );
    }
}