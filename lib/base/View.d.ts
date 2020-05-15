import { AnyObject } from './AnyObject';
import { Properties } from './Properties';
import { DOMElement, DOMEventListener } from './DOM';
import { Workbench } from './Workbench';
export declare class ViewOptions {
    type?: string;
    icon?: string;
    title?: string;
    id?: string;
    hidden?: boolean;
    style?: string;
    cls?: string;
    flexbox?: string;
    flex?: string | number;
    attrs?: string | ((view: View) => Properties);
    state?: string;
    html?: string | ((view: View) => string);
    width?: string | number | ((view: View) => string | number);
    height?: string | number | ((view: View) => string | number);
}
export declare type StateResponder = (options: {
    href: string;
}) => boolean;
export declare class View {
    static type(name: string, component: new (options: ViewOptions) => View): new (options: ViewOptions) => View | string;
    static create(options?: ViewOptions, alttype?: string): View;
    static deftype(component: new (options: ViewOptions) => View): new (options: ViewOptions) => View;
    private _options;
    private _dom;
    private _data;
    private _responder;
    constructor(options?: ViewOptions);
    get id(): string;
    options(options?: ViewOptions): View | ViewOptions;
    state(state: string | string[]): this | StateResponder | null;
    dom(): DOMElement;
    body(): DOMElement;
    html(html: any): View | string;
    findview(selector: any): any;
    find(id: string | typeof View): View | null;
    findall(id: string | typeof View): View[];
    query(selector: string): DOMElement[];
    remove(): View;
    clear(): View;
    workbench(): Workbench;
    data(data: AnyObject): View | Properties;
    show(): View;
    hide(): View;
    fire(type: string, detail?: AnyObject, cancellable?: boolean, bubble?: boolean): boolean;
    on(type: string, listener: DOMEventListener): View;
    once(type: string, listener: DOMEventListener): View;
    off(type: string, listener: DOMEventListener): View;
    protected create(options: ViewOptions): DOMElement;
}
