import $ from 'tinyselector';
import { View, ContainerOptions, Container } from '../../base';
export class CardOptions extends ContainerOptions {
}
export class Cards extends Container {
    constructor(options) {
        super(options);
        const el = $(this.dom());
        this
            .on('additem', (e) => {
            const item = e.detail?.item;
            const view = View.create(item);
            view.dom()._item = item;
            el.append(view.dom());
            this.update();
        })
            .on('removeitem', (e) => {
            el.children().each((node) => {
                if (e.detail?.item === node._item)
                    $(this).remove();
            });
            this.update();
        });
    }
    create() {
        return $('<div class="xw-cards"></div>')[0];
    }
    selected() {
        return this._selected;
    }
    select(id) {
        const item = this.getitem(id);
        if (item)
            this._selected = item;
        return this.update();
    }
    update() {
        if (!this.items().length)
            return this;
        const el = $(this.dom());
        const selected = this.selected() || this.getitem(0);
        el.children().each((node) => {
            const cel = $(node);
            const cview = node.view;
            const citem = node._item;
            if (citem === selected) {
                if (!cel.hc('active')) {
                    cel.ac('active');
                    cview && cview.fire('activate', { container: this });
                    this.fire('select', { selected: citem, view: cview });
                }
            }
            else {
                if (cel.hc('active')) {
                    cel.rc('active');
                    cview && cview.fire('deactivate', { container: this });
                }
            }
        });
        return this;
    }
}
//# sourceMappingURL=Cards.js.map