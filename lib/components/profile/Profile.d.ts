import { View, ViewOptions, DOMElement } from '../../base';
import { AnchorOptions } from '../anchor';
export declare class ProfileOptions extends ViewOptions {
    text?: string;
    image?: string;
    links?: AnchorOptions | AnchorOptions[];
}
export declare class Profile extends View {
    constructor(options: ProfileOptions);
    create(): any;
    body(): DOMElement;
    update(): void;
    text(text: any): string | this | undefined;
    image(image: any): string | this | undefined;
    links(links: any): AnchorOptions | AnchorOptions[] | this | undefined;
}
