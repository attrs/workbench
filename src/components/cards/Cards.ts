import $ from 'tinyselector';
import { View, ContainerOptions, Container } from '../../base';

export class CardOptions extends ContainerOptions {}

export class Cards extends Container {
  private _selected: any;

  constructor(options: CardOptions) {
    super(options);
  }

  public init() {
    const el = $(this.dom());

    this.on('additem', (e) => {
      const item = e.detail?.item;
      const view = View.create(item);
      view.dom()._item = item;
      el.append(view.dom());
      this.validate();
    }).on('removeitem', (e) => {
      el.children().each((i, node) => {
        if (e.detail?.item === node._item) $(node).remove();
      });
      this.validate();
    });

    super.init();
  }

  public create() {
    return $('<div class="x-stack"></div>')[0];
  }

  public selected() {
    return this._selected;
  }

  public select(id) {
    const item = this.getitem(id);
    if (item) this._selected = item;
    return this.validate();
  }

  public validate() {
    if (!(this.items() as any[]).length) return this;

    const el = $(this.dom());
    const selected = this.selected() || this.getitem(0);

    el.children().each((i, node) => {
      const cel = $(node);
      const cview = node.view;
      const citem = node._item;
      if (citem === selected) {
        if (!cel.hc('active')) {
          cel.ac('active');
          cview && cview.fire('activate', { container: this });
          this.fire('select', { selected: citem, view: cview });
        }
      } else {
        if (cel.hc('active')) {
          cel.rc('active');
          cview && cview.fire('deactivate', { container: this });
        }
      }
    });

    return this;
  }
}
