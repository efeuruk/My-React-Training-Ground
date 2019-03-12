import React, { Component } from 'react'

export default class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            a: 10
        }
        console.log("Constructor");
    }
    componentDidMount() {
        console.log("componentDidMount");
        // Api İstekleri
        this.setState({
            a: 20
        })
    }
    componentDidUpdate = (prevProps, prevState) => {
      console.log("componentDidUpdate");
    }

    shouldComponentUpdate() {
        console.log("shouldComponentUpdate");
        return true; // if false don't render again
    }
    
    render() {
        console.log("render");
        return (
        <div>
            
        </div>
        )
  }
}
