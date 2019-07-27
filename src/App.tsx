import * as React from 'react';

interface AppState {
  value: string;
}

class App extends React.Component<undefined, AppState> {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    }
  }

  componentWillMount(): void {
    const value = Office.context.roamingSettings.get('value');
    this.setState({
      value
    })
  }

  render() {
    const {value} = this.state;

    return (
      <div>
        <h1>Hello!</h1>
        <h3>The value is: {value}</h3>
        <br/>

        <input type="text" id="value"/>
        <br/>
        <button onClick={() => {
          // @ts-ignore
          const inputValue = (document.getElementById('value')).value;

          Office.context.roamingSettings.set('value', inputValue);
          Office.context.roamingSettings.saveAsync();
        }}>Store in Roaming Settings</button>
        <br/>
        {/*<button>Clear Roaming Settings</button>*/}
      </div>
    )
  }
}

export default App;
