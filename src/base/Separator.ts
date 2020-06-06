import $ from 'tinyselector';
import { View, ViewOptions } from './View';

export class Separator extends View {
  constructor(options: ViewOptions) {
    super(options);
  }

  public create() {
    return $('<div class="x-separator" />')[0];
  }
}
