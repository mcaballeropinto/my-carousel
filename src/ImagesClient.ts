import { Image } from "./Image";

const _imagesPropName = 'images';

// TODO: Store images on a server instead of using local storage.
class ImagesClient {
    public save(image: Image) {
        const images = this.load();
        images.push(image);

        // TODO: There is a limit of 5mb of local storage. Handle that.
        localStorage.setItem(_imagesPropName, JSON.stringify(images));
    }

    public load(): Image[] {
        const rawValue = localStorage.getItem(_imagesPropName);
        return rawValue ? JSON.parse(rawValue) : [];
    }

    public reset(images: Image[]) {
        localStorage.setItem(_imagesPropName, JSON.stringify(images));
    }
}

export default new ImagesClient();