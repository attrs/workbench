import { View } from './View';
import { Workbench } from './Workbench';
import { AnyObject } from './AnyObject';
export declare class DOMEvent extends Event {
    detail?: AnyObject;
}
export interface DOMEventListener {
    (event: DOMEvent, view?: View): void;
    wrapper?: (event: DOMEvent) => void;
}
export declare class DOMElement extends Element {
    view?: View;
    workbench?: Workbench;
    _item: any;
}
