import $ from 'tinyselector';
import { View, ContainerOptions, Container } from '../../base';

export class BlockOptions extends ContainerOptions {}

export class Block extends Container {
  constructor(options?: BlockOptions) {
    super(options);

    this.on('additem', (e) => {
      const item = e.detail?.item;
      const index = e.detail?.index || 0;
      const view = View.create(item);
      view.dom()._item = item;
      $(this.dom()).append(view.dom(), index);
    })
    .on('removeitem', (e) => {
      $(this.dom()).children().each((node) => {
        if( e.detail?.item === node._item ) $(this).remove();
      });
    });
  }

  public create() {
    return $('<div class="xw-block"></div>')[0];
  }
}
