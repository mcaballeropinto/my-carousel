import * as React from 'react';
import Dropzone, { ImageFile } from 'react-dropzone'
import { ComponentBase } from 'resub';

import './App.css';
import ImagesStore, { Image } from './ImagesStore';
import logo from './logo.svg';

interface AppState {
    images: Image[];
}

class App extends ComponentBase<{}, AppState> {
    protected _buildState(props: {}, initialBuild: boolean) {
        return {
            images: ImagesStore.getImages()
        };
    }

    public render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <Dropzone className="Drop-Zone" onDrop={this.onDrop}>
                    <span>Drop images here!</span>
                </Dropzone>
            </div>
        );
    }

    private onDrop = (accepted: ImageFile[], rejected: ImageFile[]) => {
        // TODO: Check for refected images.

        // TODO: Handle no accepted images scenario.
        // TODO: Handle multiple images.
        const image = accepted.length && accepted[0];
        if (image && image.preview) {
            ImagesStore.addImage({
                url: image.preview
            });
        }
    }
}

export default App;
