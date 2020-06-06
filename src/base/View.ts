import $ from 'tinyselector';
import minimatch from 'minimatch';
import { AnyObject } from './AnyObject';
import { Properties } from './Properties';
import { DOMElement, DOMEvent, DOMEventListener } from './DOM';
import { Workbench } from './Workbench';

export class ViewOptions {
  public type?: string;
  public icon?: string;
  public title?: string;
  public id?: string;
  public hidden?: boolean;
  public style?: string;
  public cls?: string;
  public flexbox?: string;
  public flex?: string | number;
  public attrs?: string | ((view: View) => Properties);
  public state?: string;
  public html?: string | ((view: View) => string);
  public width?: string | number | ((view: View) => string | number);
  public height?: string | number | ((view: View) => string | number);
}

export type StateResponder = (options: { href: string }) => boolean;

let deftype;
const types = {};

export class View {
  public static type(name: string, component: new (options: ViewOptions) => View): new (options: ViewOptions) => View | string {
    if (arguments.length <= 1) return types[name];
    types[name] = component;
    return View;
  }

  public static create(options?: ViewOptions, alttype?: string): View {
    if (!arguments.length) return new View();

    options = options || {};
    if (options instanceof View) return options;
    if (options === '-') options = { type: 'separator' };

    const type = options.type || alttype;
    const Type = type ? types[type] : deftype;

    if (!Type) throw new Error(`view type "${options.type || alttype}" does not exist`);
    return new Type(options);
  }

  public static deftype(component: new (options: ViewOptions) => View): new (options: ViewOptions) => View {
    if (!arguments.length) return deftype;
    deftype = component;
    return View;
  }

  private _options: ViewOptions;
  private _dom: DOMElement;
  private _data?: Properties;
  private _responder?: StateResponder;

  constructor(options?: ViewOptions) {
    const o = (this._options = options || {});
    const dom = (this._dom = this.create(o));
    $(dom).attr('id', o.id).ac('x-view x-noob');
    this.init();
    if (o.hidden) this.hide();
    this.on('options', (e) => {
      this.update();
    });
  }

  get id(): string {
    return $(this.dom()).attr('id');
  }

  public options(options?: ViewOptions): View | ViewOptions {
    if (!arguments.length) return this._options;
    this._options = options || {};
    this.fire('options', { options });
    return this;
  }

  public init(): void {
    const o = this.options() as ViewOptions;
    const dom = this._dom;
    const el = $(dom);
    dom.view = this;

    if (o.style) el.css(o.style);
    if (o.cls) el.ac(o.cls);
    if (o.flexbox) el.attr('flexbox', o.flexbox);
    if (o.flex) el.attr('flex', o.flex);
    if (o.state) this.state(o.state);
    if (typeof o.attrs === 'object') el.attrs(o.attrs);
    if (typeof o.attrs === 'function') el.attrs(o.attrs(this));
    if (typeof o.state === 'string') el.ac('x-state-responder');
    if (typeof o.html === 'string') this.html(o.html);
    if (typeof o.html === 'function') this.html(o.html(this));

    let width = o.width;
    if (width) {
      if (typeof width === 'function') width = width(this);
      if (typeof +width === 'number') el.css('width', width + 'px');
      else if (typeof width === 'string') el.css('width', width);
    }

    let height = o.height;
    if (height) {
      if (typeof height === 'function') height = height(this);
      if (typeof +height === 'number') el.css('height', o.height + 'px');
      else if (typeof height === 'string') el.css('height', o.height);
    }

    Object.getOwnPropertyNames(o).forEach((name) => {
      const listener: DOMEventListener = o[name];
      if (typeof listener !== 'function') return;

      if (name.startsWith('on')) this.on(name.substring(2), listener);
      else if (name.startsWith('$')) this.on(name.substring(1), listener);
    });
  }

  public update(): void {
    //
  }

  public state(state: string | string[]) {
    if (!arguments.length) return this._responder;

    const dom = this.dom();
    const el = $(dom);

    if (!state) {
      el.rc('x-state-responder').attr('data-state', null);
      delete this._responder;
      return this;
    }

    el.ac('x-state-responder');
    if (typeof state === 'string') {
      el.attr('data-state', state);
      this._responder = (o) => {
        return minimatch(o.href, state);
      };
    } else if (Array.isArray(state)) {
      el.attr('data-state', state.join(','));
      this._responder = (o) => {
        const href = o.href;
        let matched = false;
        state.forEach((s) => {
          if (minimatch(href, s)) matched = true;
        });
        return matched;
      };
    } else if (typeof state === 'function') {
      this._responder = state;
    }

    return this;
  }

  public dom(): DOMElement {
    return this._dom;
  }

  public body(): DOMElement {
    return this._dom;
  }

  public html(html): View | string {
    const el = $(this.body());
    if (!arguments.length) return el.html();
    el.html(html);
    return this;
  }

  public findview(selector) {
    const nodes = $(this.dom()).find(selector);
    if (!nodes.length) return null;

    const node = nodes[0];
    if (node.view) return node.view;
    const parent = $(node).parent('.x-view')[0];
    return parent && parent.view;
  }

  public find<T extends View>(id: string | View | typeof View): T {
    if (id instanceof View) return id as T;
    if (typeof id === 'string') {
      const node = this.dom().querySelector('#' + id + '.x-view') as DOMElement;
      if( !node?.view ) throw new Error(`view "${id}" not found`);
      return node.view as T;
    }
    return this.findall<T>(id)[0];
  }

  public findall<T extends View>(id: string | View | typeof View): T[] {
    const el = $(this.dom());
    let els;
    if (typeof id === 'string') els = el.find('#' + id + '.x-view');
    else els = el.find('.x-view');

    return els
      .map((node) => {
        if (typeof id === 'string') return node.view;
        if (typeof id === 'function') return node.view instanceof id && node.view;
      })
      .filter((item) => {
        return item;
      });
  }

  public query(selector: string): DOMElement[] {
    return $(this.dom()).find(selector);
  }

  public remove(): View {
    $(this.dom()).remove();
    this.fire('remove');
    return this;
  }

  public clear(): View {
    $(this.body()).empty();
    this.fire('clear');
    return this;
  }

  public workbench(): Workbench {
    return $(this.dom())
      .parent((node) => {
        return node.workbench;
      }, true)
      .map((p) => {
        return p && p.workbench;
      })[0];
  }

  public data(data: AnyObject): View | Properties {
    if (!arguments.length) return (this._data = data || {});
    this._data = data || {};
    this.fire('data', { data });
    return this;
  }

  public show(): View {
    $(this.dom()).css('display', '');
    return this;
  }

  public hide(): View {
    $(this.dom()).css('display', 'none');
    return this;
  }

  public fire(type: string, detail?: AnyObject, cancellable?: boolean, bubble?: boolean): boolean {
    return !!$(this.dom()).fire(type, detail, cancellable, bubble)[0];
  }

  public on(type: string, listener: DOMEventListener): View {
    listener.wrapper = (event: DOMEvent) => {
      return listener.apply(this, [event, this]);
    };

    $(this.dom()).on(type, listener.wrapper);
    return this;
  }

  public once(type: string, listener: DOMEventListener): View {
    listener.wrapper = (event: DOMEvent) => {
      return listener.apply(this, [event, this]);
    };

    $(this.dom()).once(type, listener.wrapper);
    return this;
  }

  public off(type: string, listener: DOMEventListener): View {
    $(this.dom()).off(type, listener.wrapper || listener);
    return this;
  }

  protected create(options: ViewOptions): DOMElement {
    return $('<div/>')[0];
  }
}
