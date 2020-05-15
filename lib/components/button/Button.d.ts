import { ContainerOptions, Container, DOMElement } from '../../base';
export declare class ButtonOptions extends ContainerOptions {
    icon?: string;
    text?: string;
    link?: string;
    target?: string;
    badge?: string;
    ddalign?: string;
}
export declare class Button extends Container {
    constructor(options?: ButtonOptions);
    create(): any;
    update(): Button;
    body(): DOMElement;
    ddalign(ddalign: any): string | this | undefined;
    isopen(): any;
    open(b: any): this;
    toggleopen(): this;
    icon(icon?: string): Button | string | null;
    link(link?: string): Button | string | null;
    target(target?: string): Button | string | null;
    text(text?: string): Button | string | null;
    badge(badge?: string): Button | string | null;
}
