import $ from 'tinyselector';
import { View, ContainerOptions, Container } from '../../base';

export class NavbarOptions extends ContainerOptions {}

export class Navbar extends Container {
  constructor(options: NavbarOptions) {
    super(options);
  }

  public create(options: NavbarOptions) {
    return $('<div class="x-navbar"></div>')[0];
  }

  public init() {
    const el = $(this.dom());

    this.on('additem', (e) => {
      const item = e.detail?.item;
      const index = e.detail?.index || 0;
      const view = View.create(item, 'button');
      view.dom()._item = item;
      el.append(view.dom(), index);
    }).on('removeitem', (e) => {
      el.children().each((i, node) => {
        if (e.detail?.item === node._item) $(node).remove();
      });
    });

    super.init();
  }
}
