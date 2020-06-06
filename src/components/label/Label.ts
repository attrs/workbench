import $ from 'tinyselector';
import { View, ViewOptions } from '../../base';

export class LableOptions extends ViewOptions {}

export class Label extends View {
  constructor(options?: LableOptions) {
    super(options);
  }

  public create() {
    return $('<div class="x-label"></div>')[0];
  }
}
