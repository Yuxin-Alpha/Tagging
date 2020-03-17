import * as React from "react";
import "./App.less";
import TreeView from "./components/TreeView";
// import Login from './pages/login'

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        {/* <Login /> */}
        <TreeView />
      </div>
    );
  }
}

export default App;
