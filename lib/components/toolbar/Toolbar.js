import $ from 'tinyselector';
import { View, ContainerOptions, Container } from '../../base';
export class ToolbarOptions extends ContainerOptions {
}
export class Toolbar extends Container {
    constructor(options) {
        super(options);
        const el = $(this.dom());
        this
            .on('additem', (e) => {
            const item = e.detail?.item;
            const index = e.detail?.index || 0;
            const view = View.create(item, 'button');
            view.dom()._item = item;
            el.append(view.dom(), index);
        })
            .on('removeitem', (e) => {
            el.children().each((node) => {
                if (e.detail?.item === node._item)
                    $(this).remove();
            });
        });
    }
    create(options) {
        return $('<div class="xw-toolbar"></div>')[0];
    }
}
//# sourceMappingURL=Toolbar.js.map