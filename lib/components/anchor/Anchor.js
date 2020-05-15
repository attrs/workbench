import $ from 'tinyselector';
import { View, ViewOptions } from '../../base';
export class AnchorOptions extends ViewOptions {
}
export class Anchor extends View {
    constructor(options) {
        super(options);
        this.update().on('options', (e) => {
            this.update();
        });
    }
    create() {
        return $('<a href="javascript:;" class="xw-anchor">')[0];
    }
    update() {
        const o = this.options();
        this.text(o.text);
        this.href(o.href);
        this.target(o.target);
        return this;
    }
    text(text) {
        const o = this.options();
        const el = $(this.dom());
        if (!arguments.length)
            return o.text || null;
        el.html(text);
        o.text = text;
        return this;
    }
    href(href) {
        const o = this.options();
        const el = $(this.dom());
        if (!arguments.length)
            return o.href || null;
        el.attr('href', href || 'javascript:;');
        o.href = href || '';
        return this;
    }
    target(target) {
        const o = this.options();
        const el = $(this.dom());
        if (!arguments.length)
            return o.target || null;
        el.attr('target', target);
        o.target = target;
        return this;
    }
}
//# sourceMappingURL=Anchor.js.map