import $ from 'tinyselector';
import minimatch from 'minimatch';
export class ViewOptions {
}
let deftype;
const types = {};
export class View {
    constructor(options) {
        this._data = {};
        this._responder = null;
        const o = (this._options = options || {});
        const dom = (this._dom = this.create(o));
        const el = $(dom);
        $(dom).attr('id', o.id).ac('xw-view');
        dom.view = this;
        if (o.style)
            el.css(o.style);
        if (o.cls)
            el.ac(o.cls);
        if (o.flexbox)
            el.attr('flexbox', o.flexbox);
        if (o.flex)
            el.attr('flex', o.flex);
        if (o.state)
            this.state(o.state);
        if (typeof o.attrs === 'object')
            el.attrs(o.attrs);
        if (typeof o.attrs === 'function')
            el.attrs(o.attrs(this));
        if (typeof o.state === 'string')
            el.ac('xw-state-responder');
        if (typeof o.html === 'string')
            this.html(o.html);
        if (typeof o.html === 'function')
            this.html(o.html(this));
        let width = o.width;
        if (width) {
            if (typeof width === 'function')
                width = width(this);
            if (typeof +width === 'number')
                el.css('width', width + 'px');
            else if (typeof width === 'string')
                el.css('width', width);
        }
        let height = o.height;
        if (height) {
            if (typeof height === 'function')
                height = height(this);
            if (typeof +height === 'number')
                el.css('height', o.height + 'px');
            else if (typeof height === 'string')
                el.css('height', o.height);
        }
        Object.getOwnPropertyNames(o).forEach((name) => {
            const listener = o[name];
            if (typeof listener !== 'function')
                return;
            if (name.startsWith('on'))
                this.on(name.substring(2), listener);
            else if (name.startsWith('$'))
                this.on(name.substring(1), listener);
        });
        if (o.hidden)
            this.hide();
    }
    static type(name, component) {
        if (arguments.length <= 1)
            return types[name];
        types[name] = component;
        return View;
    }
    static create(options, alttype) {
        if (!arguments.length)
            return new View();
        options = options || {};
        if (options instanceof View)
            return options;
        if (options === '-')
            options = { type: 'seperator' };
        const type = options.type || alttype;
        const Type = type ? types[type] : deftype;
        if (!Type)
            throw new Error(`view type "${options.type || alttype}" does not exist`);
        return new Type(options);
    }
    static deftype(component) {
        if (!arguments.length)
            return deftype;
        deftype = component;
        return View;
    }
    get id() {
        return $(this.dom()).attr('id');
    }
    options(options) {
        if (!arguments.length)
            return this._options;
        this._options = options || {};
        this.fire('options', { options });
        return this;
    }
    state(state) {
        if (!arguments.length)
            return this._responder;
        const dom = this.dom();
        const el = $(dom);
        if (!state) {
            el.rc('xw-state-responder').attr('data-state', null);
            this._responder = null;
            return this;
        }
        el.ac('xw-state-responder');
        if (typeof state === 'string') {
            el.attr('data-state', state);
            this._responder = (o) => {
                return minimatch(o.href, state);
            };
        }
        else if (Array.isArray(state)) {
            el.attr('data-state', state.join(','));
            this._responder = (o) => {
                const href = o.href;
                let matched = false;
                state.forEach((s) => {
                    if (minimatch(href, s))
                        matched = true;
                });
                return matched;
            };
        }
        else if (typeof state === 'function') {
            this._responder = state;
        }
        return this;
    }
    dom() {
        return this._dom;
    }
    body() {
        return this._dom;
    }
    html(html) {
        const el = $(this.body());
        if (!arguments.length)
            return el.html();
        el.html(html);
        return this;
    }
    findview(selector) {
        const nodes = $(this.dom()).find(selector);
        if (!nodes.length)
            return null;
        const node = nodes[0];
        if (node.view)
            return node.view;
        const parent = $(node).parent('.xw-view')[0];
        return parent && parent.view;
    }
    find(id) {
        if (id instanceof View)
            return id;
        if (typeof id === 'string') {
            const node = this.dom().querySelector('#' + id + '.xw-view');
            return node?.view || null;
        }
        return this.findall(id)[0];
    }
    findall(id) {
        const el = $(this.dom());
        let els;
        if (typeof id === 'string')
            els = el.find('#' + id + '.xw-view');
        else
            els = el.find('.xw-view');
        return els
            .map((node) => {
            if (typeof id === 'string')
                return node.view;
            if (typeof id === 'function')
                return node.view instanceof id && node.view;
        })
            .filter((item) => {
            return item;
        });
    }
    query(selector) {
        return $(this.dom()).find(selector);
    }
    remove() {
        $(this.dom()).remove();
        this.fire('remove');
        return this;
    }
    clear() {
        $(this.body()).empty();
        this.fire('clear');
        return this;
    }
    workbench() {
        return $(this.dom())
            .parent(() => {
            return this.workbench;
        }, true)
            .map((p) => {
            return p && p.workbench;
        })[0];
    }
    data(data) {
        if (!arguments.length)
            return this._data;
        this._data = data || {};
        this.fire('data', { data });
        return this;
    }
    show() {
        $(this.dom()).css('display', '');
        return this;
    }
    hide() {
        $(this.dom()).css('display', 'none');
        return this;
    }
    fire(type, detail, cancellable, bubble) {
        return !!$(this.dom()).fire(type, detail, cancellable, bubble)[0];
    }
    on(type, listener) {
        listener.wrapper = (event) => {
            return listener.apply(this, [event, this]);
        };
        $(this.dom()).on(type, listener.wrapper);
        return this;
    }
    once(type, listener) {
        listener.wrapper = (event) => {
            return listener.apply(this, [event, this]);
        };
        $(this.dom()).once(type, listener.wrapper);
        return this;
    }
    off(type, listener) {
        $(this.dom()).off(type, listener.wrapper || listener);
        return this;
    }
    create(options) {
        return $('<div/>')[0];
    }
}
//# sourceMappingURL=View.js.map