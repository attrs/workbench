import { ViewOptions, View } from './View.js';
export class ContainerOptions extends ViewOptions {
}
export class Container extends View {
    constructor(options) {
        super(options);
        this._items = [];
        options?.items && this.items(options.items);
    }
    additem(o, index, adjust) {
        const items = this.items();
        if (~['object', 'string'].indexOf(typeof index)) {
            const findex = items.indexOf(this.getitem(index));
            if (findex >= 0)
                index = findex + 1;
        }
        index = index || 0;
        if (!Array.isArray(o))
            o = [o];
        if (typeof adjust === 'number') {
            index += adjust;
        }
        if (index < 0)
            index = 0;
        o.forEach((item) => {
            if (!item)
                return;
            index = index || 0;
            const cindex = index || 0;
            if (index >= 0) {
                items.splice(cindex, 0, item);
                index = index + 1;
            }
            else
                items.push(item);
            this.fire('additem', { item, index: cindex });
        });
        return this;
    }
    getitem(id) {
        const items = this.items();
        if (typeof id === 'number')
            return items[id];
        return items.filter((item) => {
            return item && (item.id === id || item === id);
        })[0];
    }
    items(items) {
        if (!arguments.length)
            return this._items;
        this._items = this._items || [];
        this.clearitems().additem(items);
        return this;
    }
    clearitems() {
        this.items().slice().forEach((item) => {
            this.removeitem(item);
        });
        return this;
    }
    clear() {
        this.clearitems();
        super.clear();
        return this;
    }
    removeitem(id) {
        if (!arguments.length)
            return super.remove();
        const items = this.items();
        const item = this.getitem(id);
        const index = items.indexOf(item);
        if (~index)
            items.splice(index, 1);
        this.fire('removeitem', { item });
        return this;
    }
}
//# sourceMappingURL=Container.js.map