import { View, ViewOptions } from '../../base';
export declare class AnchorOptions extends ViewOptions {
    href?: string;
    text?: string;
    target?: string;
}
export declare class Anchor extends View {
    constructor(options: AnchorOptions);
    create(): any;
    update(): Anchor;
    text(text?: string): Anchor | string | null;
    href(href?: string): Anchor | string | null;
    target(target?: string): Anchor | string | null;
}
