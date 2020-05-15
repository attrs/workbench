import { View } from './View';
import { AnyObject } from './AnyObject';
import { DOMElement, DOMEventListener } from './DOM';
export declare class WorkbenchOptions {
    preset?: string;
}
export declare class Workbench {
    static preset(name: string, preset: AnyObject): typeof Workbench | string;
    private _options;
    private _dom;
    private _view;
    constructor(options: WorkbenchOptions);
    dom(): DOMElement;
    options(): WorkbenchOptions;
    view(): View;
    find(selector: any): View | null;
    findview(selector: any): any;
    findall(type: any): View[];
    query(selector: any): DOMElement[];
    render(target: any): this;
    validate(): this;
    perspective(id: any, concrete: any): any;
    switch(id: any): this;
    fire(type: string, detail?: AnyObject, cancellable?: boolean, bubble?: boolean): boolean;
    on(type: string, listener: DOMEventListener): Workbench;
    once(type: any, listener: DOMEventListener): Workbench;
    off(type: any, listener: DOMEventListener): Workbench;
}
