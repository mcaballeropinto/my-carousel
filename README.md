# My carousel

## Description
This is an example implementation of a carousel of images that allows the user to drag and drop images to it as well as reorder them.

##  Getting started
1. Run 
```
$ npm i && npm start
```
2. Open http://localhost:3000/

## Stack
Technologies and libraries used:
- TypeScript
- ReactJS
- Third party libraries
    - create-react-app cli tool
    - react-dropzone
    - react-slick
    - react-sortable-hoc
    - resub

## Implemented
- [x] Carousel of images.
    - Using react-slick.
- [x] Drag and drop images to load them in the carousel
    - Using react-dropzone.
- [x] Persist loaded images between page sessions.
    - This is implemented with local storage and there are size limitations. The overall limit of total storage per session is 5mb.
- [x] Reorder carousel iamges.
    - Using react-sortable-hoc.

## To be done
- [ ] Notify user when not accepted files are dropped.
- [ ] Handle multiple images.
- [ ] Improve overall style of the app.
- [ ] Scroll to newly added image.
- [ ] Workaround 5mb limit on local storage.
- [ ] Store images on a server to properly persist between sessions.
