import { Image } from "./Image";

import { autoSubscribe, AutoSubscribeStore, StoreBase } from "../node_modules/resub";
import ImagesClient from "./ImagesClient";

@AutoSubscribeStore
class ImagesStore extends StoreBase{
    private _images: Image[] = [];

    constructor() {
        super();
        
        this._images = ImagesClient.loadImages();
    }

    @autoSubscribe
    public getImages() {
        return [...this._images];
    }

    public addImage(image: Image) {
        console.log(`Image added to the store ${image.url}`);
        ImagesClient.saveImage(image);
        this._images.push(image);
        this.trigger();
    }
}

export default new ImagesStore();