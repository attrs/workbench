import { ViewOptions, View } from './View';

export class ContainerOptions extends ViewOptions {
  public items?: any[];
}

export class Container extends View {
  private _items?: any[];

  constructor(options?: ContainerOptions) {
    super(options);
  }

  public init() {
    super.init();
    const options = this.options() as ContainerOptions;
    options?.items && this.items(options.items);
  }

  public additem(o: any | any[], index?: number, adjust?: number): Container {
    const items = this.items() as any[];

    if (~['object', 'string'].indexOf(typeof index)) {
      const findex = items.indexOf(this.getitem(index));
      if (findex >= 0) index = findex + 1;
    }

    index = index || 0;

    if (!Array.isArray(o)) o = [o];
    if (typeof adjust === 'number') {
      index += adjust;
    }

    if (index < 0) index = 0;

    o.forEach((item) => {
      if (!item) return;

      index = index || 0;
      const cindex = index || 0;
      if (index >= 0) {
        items.splice(cindex, 0, item);
        index = index + 1;
      } else items.push(item);

      this.fire('additem', { item, index: cindex });
    });

    return this;
  }

  public getitem(id: any): any {
    const items = this.items() as any[];
    if (typeof id === 'number') return items[id];

    return items.find((item) => {
      return item && (item.id === id || item === id);
    });
  }

  public items(items?: any[]): Container | any[] {
    if (!arguments.length) return (this._items = this._items || []);
    this._items = this._items || [];
    this.clearitems().additem(items);
    return this;
  }

  public clearitems(): Container {
    (this.items() as any[]).slice().forEach((item) => {
      this.removeitem(item);
    });
    return this;
  }

  public clear(): Container {
    this.clearitems();
    super.clear();
    return this;
  }

  public removeitem(id): View {
    if (!arguments.length) return super.remove();

    const items = this.items() as any[];
    const item = this.getitem(id);
    const index = items.indexOf(item);
    if (~index) items.splice(index, 1);
    this.fire('removeitem', { item });
    return this;
  }
}
