import $ from 'tinyselector';
import { View, ViewOptions } from '../../base';
export class LableOptions extends ViewOptions {
}
export class Label extends View {
    constructor(options) {
        super(options);
    }
    create() {
        return $('<div class="xw-label"></div>')[0];
    }
}
//# sourceMappingURL=Label.js.map