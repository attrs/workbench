import $ from 'tinyselector';
import minimatch from 'minimatch';
import { Workbench } from './Workbench';

export class Properties {
  [name: string]: string;
}

export class AnyObject {
  [name: string]: any;
}

export class ViewOption {
  public type?: string;
  public id?: string;
  public style?: string;
  public hidden?: boolean;
  public cls?: string;
  public flexbox?: string;
  public flex?: string | number;
  public state?: string;
  public attrs?: Properties | (() => Properties);
  public width?: string | number | (() => number | string);
  public height?: string | number | (() => number | string);
  public html?: string | (() => string);
}

export class DOMElement extends Element {
  public view: View;
}

const types: {
  [name: string]: new (options?: ViewOption) => View;
} = {};

export class View {
  public static type(name: string, component: new (options?: ViewOption) => View) {
    if (arguments.length <= 1) return types[name];
    types[name] = component;
    return this;
  }

  public static create(o: ViewOption, deftype: string) {
    if (!arguments.length) return new View();
    if (!o) return console.error('arguments cannot be null');
    if (o instanceof View) return o;
    if (o === '-') o = { type: 'separator' };

    const type = o.type ? types[o.type] : types[deftype || 'view'];
    if (!type) return console.error('not fount view type: ' + (o.type || deftype));

    return new type(o);
  }

  private _options: ViewOption;
  private _dom: DOMElement;
  private _data: Properties;
  private stateresponder: (options?: any) => boolean;

  constructor(options?: ViewOption) {
    const o = (this._options = options || {});

    const dom = (this._dom = this.create(o));
    $(dom).attr('id', o.id).ac('xw-view');
    dom.view = this;
    if (o.hidden) this.hide();
    const el = $(dom);

    if (o.style) el.css(o.style);
    if (o.cls) el.ac(o.cls);
    if (o.flexbox) el.attr('flexbox', o.flexbox);
    if (o.flex) el.attr('flex', o.flex);
    if (o.state) this.state(o.state);
    if (typeof o.attrs === 'object') el.attrs(o.attrs);
    if (typeof o.attrs === 'function') el.attrs(o.attrs.call(this));
    if (typeof o.state === 'string') el.ac('xw-state-responder');
    if (typeof o.html === 'string') this.html(o.html);
    if (typeof o.html === 'function') this.html(o.html.call(this));

    let width = o.width;
    if (width) {
      if (typeof width === 'function') width = width.call(this);

      if (typeof +width === 'number') el.css('width', width + 'px');
      else if (typeof width === 'string') el.css('width', width);
    }

    let height = o.height;
    if (height) {
      if (typeof height === 'function') height = height.call(this);

      if (typeof +height === 'number') el.css('height', o.height + 'px');
      else if (typeof height === 'string') el.css('height', o.height);
    }

    Object.getOwnPropertyNames(o).forEach((name) => {
      const fn = o[name];
      if (typeof fn !== 'function') return;

      if (name.startsWith('on')) this.on(name.substring(2), fn);
      else if (name.startsWith('$')) this.on(name.substring(1), fn);
    });
  }

  get id(): string {
    return $(this.dom()).attr('id');
  }

  public create(options?: ViewOption): DOMElement {
    return $('<div/>')[0];
  }

  public options(options) {
    if (!arguments.length) return this._options;
    this._options = options || {};
    this.fire('options', { options });
    return this;
  }

  public state(state) {
    if (!arguments.length) return this.stateresponder;
    const dom = this.dom();
    const el = $(dom);

    if (!state) {
      el.rc('xw-state-responder').attr('data-state', null);
      this.stateresponder = null;
      return this;
    }

    let responder;
    el.ac('xw-state-responder');
    if (typeof state === 'string') {
      el.attr('data-state', state);
      responder = (o) => {
        return minimatch(o.href, state);
      };
    } else if (Array.isArray(state)) {
      el.attr('data-state', state.join(','));
      responder = (o) => {
        const href = o.href;
        let matched = false;
        state.forEach((s) => {
          if (minimatch(href, s)) matched = true;
        });
        return matched;
      };
    } else if (typeof state === 'function') {
      responder = state;
    }

    this.stateresponder = responder;
    return this;
  }

  public dom(): DOMElement {
    return this._dom;
  }

  public body(): DOMElement {
    return this._dom;
  }

  public html(html?: string): View | string {
    const el = $(this.body());
    if (!arguments.length) return el.html();
    el.html(html);
    return this;
  }

  public findview(selector: string): View {
    const nodes = $(this.dom()).find(selector);
    if (!nodes.length) return null;

    const node = nodes[0];
    if (node.view) return node.view;
    const parent = $(node).parent('.xw-view')[0];
    return parent && parent.view;
  }

  public find(id: string | View): View {
    if (id instanceof View) return id;
    if (typeof id === 'string') {
      const node: DOMElement = this.dom().querySelector('#' + id + '.xw-view');
      return node && node.view;
    }
    return this.findall(id)[0];
  }

  public findall(id): View[] {
    const el = $(this.dom());
    let els;
    if (typeof id === 'string') els = el.find('#' + id + '.xw-view');
    else els = el.find('.xw-view');

    return els
      .map((node) => {
        if (typeof id === 'string') return node.view;
        if (typeof id === 'function') return node.view instanceof id && node.view;
      })
      .filter((v) => v);
  }

  public query(selector): DOMElement {
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
      .parent(() => {
        return this.workbench;
      }, true)
      .map((p) => {
        return p && p.workbench;
      })[0];
  }

  public data(data?: Properties): Properties | View {
    if (!arguments.length) return this._data;
    this._data = data;
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
    return !!$(this.dom()).fire(type, detail || {}, cancellable, bubble)[0];
  }

  public on(type, fn): View {
    fn._wrapper = (...arg) => {
      return fn.apply(this, arg);
    };

    $(this.dom()).on(type, fn._wrapper);
    return this;
  }

  public once(type, fn): View {
    fn._wrapper = (...arg) => {
      return fn.apply(this, arg);
    };

    $(this.dom()).once(type, fn._wrapper);
    return this;
  }

  public off(type: string, fn): View {
    $(this.dom()).off(type, fn._wrapper || fn);
    return this;
  }
}

export class Separator extends View {
  constructor(options: ViewOption) {
    super(options);
  }

  public create(): DOMElement {
    return $('<div class="xw-separator" />')[0];
  }
}

View.type('separator', Separator);
View.type('view', View);
