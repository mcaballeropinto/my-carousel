import { Image } from "./Image";

const _imagesPropName = 'images';

// TODO: Store images on a server instead of using local storage.
class ImagesClient {
    public saveImage(image: Image) {
        const images = this.loadImages();
        images.push(image);

        // TODO: There is a limit of 5mb of local storage. Handle that.
        localStorage.setItem(_imagesPropName, JSON.stringify(images));
    }

    public loadImages(): Image[] {
        const rawValue = localStorage.getItem(_imagesPropName);
        return rawValue ? JSON.parse(rawValue) : [];
    }
}

export default new ImagesClient();