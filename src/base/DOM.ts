import { View } from './View';
import { Workbench } from './Workbench';
import { AnyObject } from './AnyObject';

export class DOMEvent extends Event {
  public detail?: AnyObject;
}

export interface DOMEventListener {
  (event: DOMEvent, view?: View): void;
  wrapper?: (event: DOMEvent) => void;
}

export class DOMElement extends Element {
  public view?: View;
  public workbench?: Workbench;
  public _item: any;
}
