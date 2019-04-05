import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Aux from '../../../hoc/Aux'
// import Radium from 'radium';

import withClass from '../../../hoc/withClass';
import classes from './Person.css';
import AuthContext from '../../../context/auth-context';

class Person extends Component {
    // const style = {
    //     '@media (min-width: 500px)': {
    //         width: '450px'
    //     }
    // };

    constructor(props) {
        super(props);
        this.inputElementRef = React.createRef();
    }

    static contexType = AuthContext;

    componentDidMount() {
        //this.inputElement.focus();
        this.inputElementRef.current.focus();
        console.log(this.context.authenticated);
    }
   
    render() { 
        // console.log('[Person.js] rendering...');
        return (
            <Aux>
                
                {this.context.authenticated ? <p>Authenticated!</p> : <p>Please log in</p>}
               
                <p key="i2" onClick={this.props.click}>I'am a {this.props.name} and I am {this.props.age} years old!</p>
                <p key="i3">{this.props.children}</p>
                <input key="i4" 
                //ref={(inputEl) => {this.inputElement = inputEl}} type="text" 
                ref={this.inputElementRef}
                onChange={this.props.changed} value={this.props.name}/>
            </Aux>
        );  
    }
   
}

Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func
};

export default withClass(Person, classes.Person);