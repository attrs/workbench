import { ViewOptions, View } from './View.js';
export declare class ContainerOptions extends ViewOptions {
    items?: any[];
}
export declare class Container extends View {
    private _items;
    constructor(options?: ContainerOptions);
    additem(o: any | any[], index?: number, adjust?: number): Container;
    getitem(id: any): any;
    items(items?: any[]): Container | any[];
    clearitems(): Container;
    clear(): Container;
    removeitem(id: any): View;
}
