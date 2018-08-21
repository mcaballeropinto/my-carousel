import { autoSubscribe, AutoSubscribeStore, StoreBase } from "../node_modules/resub";

export interface Image {
    url: string;
}

@AutoSubscribeStore
class ImagesStore extends StoreBase{
    private images: Image[] = [];

    @autoSubscribe
    public getImages() {
        return this.images;
    }

    public addImage(image: Image) {
        console.log(`Image added to the store ${image.url}`);
        this.images.push(image);
        this.trigger();
    }
}

export default new ImagesStore();