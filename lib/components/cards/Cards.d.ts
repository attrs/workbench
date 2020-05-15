import { ContainerOptions, Container } from '../../base';
export declare class CardOptions extends ContainerOptions {
}
export declare class Cards extends Container {
    private _selected;
    constructor(options: CardOptions);
    create(): any;
    selected(): any;
    select(id: any): this;
    update(): this;
}
