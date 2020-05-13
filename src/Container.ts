import $ from 'tinyselector';
import { View } from './view';

export class Container extends View {
  private _items: View[];

  constructor(options: any) {
    super(options);
    this.items(options.items);
  }

  public additem(o: View[], index?: number, adjust?: number): View {
    const items = this.items();

    if (~['object', 'string'].indexOf(typeof index)) {
      const findex = items.indexOf(this.getitem(index));
      if (findex >= 0) index = findex + 1;
    }

    if (!Array.isArray(o)) o = [o];
    if (typeof adjust === 'number') {
      index += adjust;
    }

    if (index < 0) index = 0;

    o.forEach( (item) => {
      if (!item) return;

      const cindex = index;
      if (index >= 0) {
        items.splice(cindex, 0, item);
        index = index + 1;
      } else items.push(item);

      this.fire('additem', { item, index: cindex });
    });

    return this;
  }

  public getitem(id): View {
    const items = this.items();
    if (typeof id === 'number') return items[id];

    return items.filter((item) => {
      return item && (item.id === id || item === id);
    })[0];
  }

  public items(items?: any[]): View[] {
    if (!arguments.length) return this._items;

    this._items = this._items || [];
    this.clearitems().additem(items);
    return this;
  }

  public clearitems(): Container {
    this.items().forEach((item) => {
      this.removeitem(item);
    });
    return this;
  }

  public clear(): Container {
    this.clearitems();
    super.clear();
    return this;
  }

  public removeitem(id): Container {
    const item = this.getitem(id);
    if( !item ) return this;
    const items = this.items();
    const index = items.indexOf(item);
    if (~index) items.splice(index, 1);
    this.fire('removeitem', { item });
    return this;
  }
}
