import * as React from 'react';
import Dropzone, { ImageFile } from 'react-dropzone'
import Slider from 'react-slick';
import {arrayMove, SortableContainer, SortableElementProps, SortEnd} from 'react-sortable-hoc';
import { ComponentBase } from 'resub';

import './App.css';
import { Image } from "./Image";
import ImagesStore from './ImagesStore';
import logo from './logo.svg';

interface AppState {
    images: Image[];
    isEditing: boolean;
}

interface SortableElementProps {
    image: Image;
}

interface SortableContainerProps {
    images: Image[];
}

class App extends ComponentBase<{}, AppState> {
    protected _buildState(props: {}, initialBuild: boolean) {
        return {
            images: ImagesStore.getAll()
        };
    }

    public render() {
        const list: JSX.Element = this.state.isEditing ? this._renderSortableList() : this._renderCarousel();

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

                    <button 
                        className={ 'App-button' } 
                        onClick={ this._onEditClick }
                    >
                        { this.state.isEditing ? 'Show carousel' : 'Edit carousel'}
                    </button>

                    { list }
                </section>
            </div>
        );
    }

    private _renderCarousel = () => {
        const imagesToRender: JSX.Element[] = this.state.images.map(this._renderImage);
        return (
            <Slider 
                className="App-slider"
                slidesToShow={ 1 }
                infinite={ false }
                variableWidth={ true }
                dots={ true }
            >
                { imagesToRender }
            </Slider>
        );
    }

    private _renderSortableList = () => {
        const SortableImage = SortableElementProps((props: SortableElementProps) => this._renderImage(props.image));
        const SortableList = SortableContainer((props: SortableContainerProps) => {
            const images = props.images.map((image, index) => <SortableImage key={ `image-${index}` } index={ index } image={ image }/>) 
            return (
                <ul className={ 'App-sortable-list' }>
                    { images }
                </ul>
            )
        });
        return (
            <div>
                <span>Drag and drop images to sort them out.</span>
                <SortableList 
                    images={ this.state.images } 
                    onSortEnd={ this._onSortEnd } 
                />
            </div>
        );
    }

    private _renderImage = (image: Image, index?: number) => {
        return (
            <div key={ `image-${index}` }>
                <img src={ image.url } />
            </div>
        );
    }

    private _onSortEnd = (sortEnd: SortEnd) => {
        const images = arrayMove(this.state.images, sortEnd.oldIndex, sortEnd.newIndex);
        ImagesStore.reset(images);
    }


    private _onDrop = (accepted: ImageFile[], rejected: ImageFile[]) => {
        // TODO: Check for rejected images.

        // TODO: Handle not accepted files scenario.
        // TODO: Handle multiple images.
        const image = accepted.length && accepted[0];
        if (image) {
            // TODO: Handle the case when file couldn't be loaded.
            const reader = new FileReader();
            reader.onloadend = (fileLoaded: ProgressEvent) => {
                ImagesStore.add({
                    url: reader.result as string
                });
            };

            reader.readAsDataURL(image);
        }
    }

    private _onEditClick = () => {
        this.setState({ isEditing: !this.state.isEditing });
    }
}

export default App;
