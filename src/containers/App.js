import React, { Component, useState } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/withClass';
import Aux from '../hoc/Auxi';
import AuthContext from '../context/auth-context';

// import Radium, { StyleRoot } from 'radium';
// import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';

class App extends Component {
  constructor(props) {
    super(props);
    console.log('[App.js] constructor');
  }

  state = {
    persons: [
      {id: 'fddfd', name: 'Max', age: 28},
      {id: 'hgfrtr', name: 'Manu', age: 28},
      {id: 'sdgdf', name: 'Stephanie', age: 26}
    ],
    otherState: 'some other value',
    showPersons: false,
    showCockpit: true,
    changeCounter: 0,
    authenticated: false
  }

  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedStateFromProps', props);
    return state;
  }

  componentWillMount() {
    console.log('[App.js] componentWillMount');
  }

  componentDidMount() {
    console.log('[App.js] componentDidMount');
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('[App.js] shouldComponentUpdate');
    return true;
  }

  componentDidUpdate() {
    console.log('[App.js] componentDidUpdate');
  }

  switchNameHandler = (newName) => {
    // console.log('Was clicked!');
    this.setState({persons: 
      [
        {name: newName, age: 28},
        {name: 'Manu', age: 28},
        {name: 'Stephanie', age: 27}
      ]
    })
  }

  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    // const person = Object.assign({}, this.state.persons[personIndex]);

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState((prevState, props) => {
      return {
        persons: persons,
        changeCounter: prevState.changeCounter + 1
      };
    });
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  loginHandler = () => {
    this.setState({authenticated: true});
  }

  render() {
    // const style = {
    //   backgroundColor: 'green',
    //   color: 'white',
    //   font: 'inherit',
    //   border: '1px solid blue',
    //   padding: '8px',
    //   cursor: 'pointer',
    //   // ':hover': {
    //   //   backgroundColor: 'lightgreen',
    //   //   color: 'black'
    //   // }
    // };

    console.log('[App.js] render');
    let persons = null;
    

    if(this.state.showPersons) {
      persons = <Persons 
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangedHandler}
          isAuthenticated={this.state.authenticated}
        />;
      

      // style.backgroundColor = 'red';
      // style[':hover'] = {
      //   backgroundColor: 'lightred',
      //   color: 'black'
      // }
    }

   
    return (
      // <StyleRoot>
        <Aux>
          <button onClick={() => {this.setState({showCockpit: false})}}>Remove Cocpit</button>
          <AuthContext.Provider value={{
            authenticated: this.state.authenticated, 
            login: this.loginHandler
          }}>
            {this.state.showCockpit ? (
              <Cockpit
                title={this.props.appTitle}
                showPersons={this.state.showPersons} 
                personsLength={this.state.persons.length}
                clicked={this.togglePersonsHandler}
                login={this.loginHandler}
              />)
            : null}
            {persons}
          </AuthContext.Provider>
        </Aux>
      // </StyleRoot>
      
    );
    // return React.createElement('div', null, React.createElement('h1', {className: 'App'}, 'Hi I\'m a React App'));
  }







  // const [ personsState, setPersons ] = useState(
  //   {
  //       persons: [
  //         {name: 'Max', age: 28},
  //         {name: 'Manu', age: 28},
  //         {name: 'Stephanie', age: 26}
  //       ]
  //   }
  // );

  // useState('some other value');

  // const switchNameHandler = () => {
  //   // console.log('Was clicked!');
  //   setPersons({persons: 
  //     [
  //       {name: 'Max', age: 28},
  //       {name: 'Manu', age: 28},
  //       {name: 'Stephanie', age: 27}
  //     ]
  //   })
  // }

  // return (
  //   <div className="App">
  //     <h1>Hi am a React App</h1>
  //     <p>This is realy working</p>
  //     <button onClick={switchNameHandler}>Switch Name</button>
  //     <Person name={personsState.persons[0].name} age={personsState.persons[0].age}/>
  //     <Person name={personsState.persons[1].name} age={personsState.persons[1].age}>My Hobbies: Racing</Person>
  //     <Person name={personsState.persons[2].name} age={personsState.persons[2].age}/>
  //   </div>
  // );

}

export default withClass(App, classes.App);
