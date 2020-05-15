import { View, ContainerOptions, Container, DOMElement } from '../../base';
export declare class TabbedOptions extends ContainerOptions {
    icon?: string;
    text?: string;
    link?: string;
    target?: string;
    badge?: string;
    ddalign?: string;
}
export declare class Tabbed extends Container {
    private _selected;
    constructor(options: TabbedOptions);
    create(): any;
    init(o: any): void;
    oneline(b: boolean): Tabbed | boolean;
    icononly(b: boolean): Tabbed | boolean;
    titleonly(b: boolean): Tabbed | boolean;
    body(): DOMElement;
    tabs(): DOMElement;
    items(items: any[]): Tabbed | any[];
    add(item: any, index?: number): Tabbed;
    remove(id?: any): Tabbed;
    get(id: any): View | null;
    indexOf(view: any): number;
    children(): View[];
    selected(): any;
    active(id: any): Tabbed;
    validate(): Tabbed;
    clear(): Tabbed;
}
