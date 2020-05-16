import $ from 'tinyselector';
import { View, ViewOptions } from './View';

export class Separator extends View {
  constructor(options: ViewOptions) {
    super(options);
  }

  public create() {
    return $('<div class="xw-separator" />')[0];
  }
}
