import * as React from 'react';
import './App.less';
import Login from './pages/login'

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <Login />
      </div>
    );
  }
}

export default App;
