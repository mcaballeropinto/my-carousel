import { Image } from "./Image";

import { autoSubscribe, AutoSubscribeStore, StoreBase } from "../node_modules/resub";
import ImagesClient from "./ImagesClient";

@AutoSubscribeStore
class ImagesStore extends StoreBase{
    private _images: Image[] = [];

    constructor() {
        super();
        
        this._images = ImagesClient.load();
    }

    @autoSubscribe
    public getAll() {
        return [...this._images];
    }

    public add(image: Image) {
        console.log(`Image added to the store.`);
        ImagesClient.save(image);
        this._images.push(image);
        this.trigger();
    }

    public reset(images: Image[]) {
        console.log(`Images reset.`);
        ImagesClient.reset(images);
        this._images = images;
        this.trigger();
    }
}

export default new ImagesStore();