import * as React from 'react';
import Dropzone, { ImageFile } from 'react-dropzone'
import './App.css';

import logo from './logo.svg';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Dropzone className="Drop-Zone" onDrop={ this.onDrop }>
          <span>Drop images here!</span>
        </Dropzone>
      </div>
    );
  }

  private onDrop = (accepted: ImageFile[], rejected: ImageFile[]) => {
    return;
  }
}

export default App;
