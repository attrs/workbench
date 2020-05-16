import { View } from './View';
import { AnyObject } from './AnyObject';
import { DOMElement, DOMEventListener } from './DOM';
import $ from 'tinyselector';
import equals from 'array-equal';
import { detectstate } from '../state';

export class WorkbenchOptions {
  public preset?: string;
}

const presets = {};
const perspectives = {};
let currentperspective;
let currentperspecticearg: any[] = [];

export class Workbench {
  public static preset(name: string, preset: AnyObject): typeof Workbench | string {
    if (arguments.length <= 1) return presets[name];
    presets[name] = preset;
    return Workbench;
  }

  private _options: WorkbenchOptions;
  private _dom: DOMElement;
  private _view: View;

  constructor(options: WorkbenchOptions) {
    if (typeof options === 'string') options = { preset: options };
    const o = (this._options = options || {});

    if (o.preset) {
      const preset = presets[o.preset];
      if (!preset) throw new Error(`preset "${o.preset}" does not exist`);
      this._view = View.create(preset.view);
    } else {
      this._view = View.create();
    }

    this._dom = $('<div>').ac('xw').append(this._view.dom())[0];
    this._dom.workbench = this;
  }

  public dom() {
    return this._dom;
  }

  public options() {
    return this._options;
  }

  public view() {
    return this._view;
  }

  public find(selector) {
    return this._view.find(selector);
  }

  public findview(selector) {
    return this._view.findview(selector);
  }

  public findall(type) {
    return this._view.findall(type);
  }

  public query(selector) {
    return this._view.query(selector);
  }

  public render(target) {
    $(this._dom).appendTo(target);
    detectstate();
    return this;
  }

  public validate() {
    detectstate();
    return this;
  }

  public perspective(id, concrete) {
    if (!arguments.length) return currentperspective;
    if (arguments.length === 1) return perspectives[id];

    if (typeof concrete === 'function') perspectives[id] = new concrete(this);
    else if (typeof concrete === 'object') perspectives[id] = concrete;
    else throw new TypeError('perspective must be a class(function) or object');

    return this;
  }

  public switch(id, ...arg) {
    const perspective = perspectives[id];
    if (!perspective) throw new Error('not found perspective: ' + id);
    if (currentperspective === perspective && equals(arg, currentperspecticearg)) return this;

    if (currentperspective && currentperspective.deactivate) currentperspective.deactivate();
    currentperspective = perspective;
    currentperspecticearg = arg;
    perspective.activate && perspective.activate.apply(perspective, arg);
    return this;
  }

  public fire(type: string, detail?: AnyObject, cancellable?: boolean, bubble?: boolean): boolean {
    return this._view.fire(type, detail, cancellable, bubble);
  }

  public on(type: string, listener: DOMEventListener): Workbench {
    this._view.on(type, listener);
    return this;
  }

  public once(type, listener: DOMEventListener): Workbench {
    this._view.on(type, listener);
    return this;
  }

  public off(type, listener: DOMEventListener): Workbench {
    this._view.on(type, listener);
    return this;
  }
}
