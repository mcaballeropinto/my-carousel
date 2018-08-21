import * as React from 'react';
import Dropzone, { ImageFile } from 'react-dropzone'
import Slider from 'react-slick';
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
        const imagesToRender: JSX.Element[] = [];
        this.state.images.forEach((image, index) => {
            imagesToRender.push(
                <div key={ `image-${index}` }>
                    <img src={ image.url } />
                </div>
            )
        });

        // TODO: Scroll to the newly added image.
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <section className="App-images">
                    <Dropzone className="App-drop-zone" onDrop={this._onDrop}>
                        <span>Drop images here!</span>
                    </Dropzone>
                    <Slider 
                        className="App-slider"
                        slidesToShow={ 1 }
                        infinite={ false }
                        variableWidth={ true }
                        dots={ true }
                    >
                        { imagesToRender }
                    </Slider>
                </section>
            </div>
        );
    }

    private _onDrop = (accepted: ImageFile[], rejected: ImageFile[]) => {
        // TODO: Check for rejected images.

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
