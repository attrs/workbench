import { View } from './View';
import $ from 'tinyselector';
import equals from 'array-equal';
import { detectstate } from '../state';
export class WorkbenchOptions {
}
const presets = {};
const perspectives = {};
let currentperspective;
let currentperspecticearg = [];
export class Workbench {
    constructor(options) {
        if (typeof options === 'string')
            options = { preset: options };
        const o = (this._options = options || {});
        if (o.preset) {
            const preset = presets[o.preset];
            if (!preset)
                throw new Error('preset');
            this._view = View.create(preset.view);
        }
        else {
            this._view = View.create();
        }
        this._dom = $('<div>').ac('xw').append(this._view.dom())[0];
        this._dom.workbench = this;
    }
    static preset(name, preset) {
        if (arguments.length <= 1)
            return presets[name];
        presets[name] = preset;
        return Workbench;
    }
    dom() {
        return this._dom;
    }
    options() {
        return this._options;
    }
    view() {
        return this._view;
    }
    find(selector) {
        return this._view.find(selector);
    }
    findview(selector) {
        return this._view.findview(selector);
    }
    findall(type) {
        return this._view.findall(type);
    }
    query(selector) {
        return this._view.query(selector);
    }
    render(target) {
        $(this._dom).appendTo(target);
        detectstate();
        return this;
    }
    validate() {
        detectstate();
        return this;
    }
    perspective(id, concrete) {
        if (!arguments.length)
            return currentperspective;
        if (arguments.length === 1)
            return perspectives[id];
        if (typeof concrete === 'function')
            perspectives[id] = new concrete(this);
        else if (typeof concrete === 'object')
            perspectives[id] = concrete;
        else
            throw new TypeError('perspective must be a class(function) or object');
        return this;
    }
    switch(id) {
        const perspective = perspectives[id];
        const arg = [].slice.call(arguments, 1);
        if (!perspective)
            throw new Error('not found perspective: ' + id);
        if (currentperspective === perspective && equals(arg, currentperspecticearg))
            return this;
        if (currentperspective && currentperspective.deactivate)
            currentperspective.deactivate();
        currentperspective = perspective;
        currentperspecticearg = arg;
        perspective.activate && perspective.activate.apply(perspective, arg);
        return this;
    }
    fire(type, detail, cancellable, bubble) {
        return this._view.fire(type, detail, cancellable, bubble);
    }
    on(type, listener) {
        this._view.on(type, listener);
        return this;
    }
    once(type, listener) {
        this._view.on(type, listener);
        return this;
    }
    off(type, listener) {
        this._view.on(type, listener);
        return this;
    }
}
//# sourceMappingURL=Workbench.js.map