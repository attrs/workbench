import $ from 'tinyselector';
import { View, ViewOptions, ContainerOptions, Container, DOMElement } from '../../base';

export class TabbedOptions extends ContainerOptions {
  public oneline?: boolean;
  public icononly?: boolean;
  public titleonly?: boolean;
}

export class Tabbed extends Container {
  private _selected: any;

  constructor(options: TabbedOptions) {
    super(options);
  }

  public create() {
    return $('<div class="xw-tab">\
      <div class="xw-tab-body"></div>\
      <div class="xw-tab-tabs"></div>\
    </div>')[0];
  }

  public init() {
    const o = this.options() as TabbedOptions;
    const el = $(this.dom());

    this.oneline(o.oneline);
    this.icononly(o.icononly);
    this.titleonly(o.titleonly);

    this.on('additem', (e) => {
      const item = e.detail?.item;
      const view = View.create(item);
      view.dom()._item = item;
      el.append(view.dom());
      this.validate();
    }).on('removeitem', (e) => {
      el.children().each((i, node) => {
        if (e.detail?.item === node._item) $(node).remove();
      });

      this.validate();
    });

    super.init();
    el.attr('flexbox', null);
  }

  public oneline(b?: boolean): Tabbed | boolean {
    if (!arguments.length) return $(this.dom()).hc('xw-tab-oneline');
    $(this.dom()).tc('xw-tab-oneline', b);
    return this;
  }

  public icononly(b?: boolean): Tabbed | boolean {
    if (!arguments.length) return $(this.dom()).hc('xw-tab-icon-only');
    $(this.dom()).tc('xw-tab-icon-only', b);
    return this;
  }

  public titleonly(b?: boolean): Tabbed | boolean {
    if (!arguments.length) return $(this.dom()).hc('xw-tab-title-only');
    $(this.dom()).tc('xw-tab-title-only', b);
    return this;
  }

  public body(): DOMElement {
    return $(this.dom()).find('.xw-tab-body')[0];
  }

  public tabs(): DOMElement {
    return $(this.dom()).find('.xw-tab-tabs')[0];
  }

  public items(items: any[]): Tabbed | any[] {
    items &&
      items.forEach((item) => {
        if (!item) return;
        this.add(item);
      });
    return this;
  }

  public add(item: any, index?: number): Tabbed {
    if (!item) return this;

    const view = View.create(item);
    const body = $(this.body());
    const tabs = $(this.tabs());
    const title = (view.options() as ViewOptions).title || 'Untitled';
    let icon = (view.options() as ViewOptions).icon || '<i class="fa fa-cube"></i>';

    if (icon) icon = '<div class="xw-tab-item-icon">' + icon + '</div>';

    const tabbtn = $('<div class="xw-tab-item">')
      .html(icon + title)
      .click((e) => {
        view.fire('tab', { originalEvent: e });
        this.active(view);
      });

    body.append(view.dom(), index);
    tabs.append(tabbtn, index);

    return this.validate();
  }

  public remove(id?: any): Tabbed {
    if (!arguments.length) {
      super.remove();
      return this;
    }

    const index = this.indexOf(id);
    if (~index) {
      $(this.body().children[index]).remove();
      $(this.tabs().children[index]).remove();
    }
    return this.validate();
  }

  public get(id: any): View | null {
    if (!id && id !== 0) return null;

    const body = this.body();
    const children = body.children;
    if (typeof id === 'number') return (children[id] && (children[id] as DOMElement).view) || null;
    if (typeof id !== 'string') return null;

    return $(body)
      .children('#' + id)
      .map((el) => {
        return el.view;
      })
      .filter((v) => v)[0];
  }

  public indexOf(view): number {
    if (!(view instanceof View)) view = this.get(view);
    const views = $(this.body())
      .children()
      .map((el) => {
        return el.view;
      })
      .filter((v) => v);

    return views?.indexOf(view);
  }

  public children(): View[] {
    return $(this.body())
      .children()
      .map((el) => {
        return el.view;
      })
      .filter((v) => v);
  }

  public selected(): any {
    return this._selected;
  }

  public active(id): Tabbed {
    const view = id instanceof View ? id : this.get(id);
    if (~this.indexOf(view)) this._selected = view;
    return this.validate();
  }

  public validate(): Tabbed {
    let selected = this.selected() || this.get(0);
    let index = this.indexOf(selected);
    const body = this.body();
    const tabs = this.tabs();

    if (!~index) {
      selected = this.get(0);
      index = this.indexOf(selected);
    }

    if (~index) {
      const selbody = $(body.children[index]);
      const seltab = $(tabs.children[index]);

      if (!selbody.hc('active')) {
        $(this.dom()).find('.xw-tab-body > .active, .xw-tab-tabs > .active').rc('active');
        selbody.ac('active');

        const detail = { prev: this._selected, current: selected };
        this._selected && this._selected.fire('deactivate', detail);
        selected.fire('activate', detail);
        this.fire('change', detail);
        this._selected = selected;
      }

      if (!seltab.hc('active')) seltab.ac('active');
    }

    if (body.children.length > 1) $(tabs).show();
    else $(tabs).hide();

    return this;
  }

  public clear(): Tabbed {
    $(this.body()).empty();
    $(this.tabs()).empty();
    return this;
  }
}
