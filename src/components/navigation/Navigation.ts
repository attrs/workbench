import $ from 'tinyselector';
import { View, ContainerOptions, Container } from '../../base';
import { NavItem } from './NavItem';

export class NavigationOptions extends ContainerOptions {
  public group?: string;
  public multiple?: boolean;
  public autocollapse?: boolean;
}

export class Navigation extends Container {
  private _selected: View[] = [];

  constructor(options: NavigationOptions) {
    super(options);
  }

  public create() {
    return $('<div class="x-navigation">\
      <div class="x-navigation-title x-hidden"></div>\
      <ul class="x-navigation-items"></ul>\
    </div>')[0];
  }

  public init() {
    const o = this.options() as NavigationOptions;
    const el = $(this.dom());
    const ul = el.children('ul');

    this.title(o.title);
    this.deselect();
    this.group(o.group);
    this.multiple(o.multiple === true ? true : false);
    this.autocollapse(o.autocollapse === false ? false : true);

    this.on('options', (e) => {
      this.title(e.detail?.options.title);
    })
      .on('additem', (e) => {
        const item = e.detail?.item;
        const index = e.detail?.index;
        const view = View.create(item, 'navitem');
        view.dom()._item = item;
        ul.append(view.dom(), index);
      })
      .on('removeitem', (e) => {
        ul.children().each((i, node) => {
          if (e.detail?.item === node._item) $(node).remove();
        });
      });

    super.init();
  }

  public group(group?: string) {
    const o = this.options() as NavigationOptions;
    const el = $(this.dom());
    if (!arguments.length) return o.group;
    o.group = group;

    el.attr('data-navigation-group', group);

    return this;
  }

  public multiple(multiple?: boolean) {
    const o = this.options() as NavigationOptions;
    if (!arguments.length) return o.multiple;
    o.multiple = multiple;
    return this;
  }

  public autocollapse(autocollapse?: boolean) {
    const o = this.options() as NavigationOptions;
    if (!arguments.length) return o.autocollapse;
    o.autocollapse = autocollapse;
    return this;
  }

  public title(title?: string) {
    const o = this.options() as NavigationOptions;
    const el = $(this.dom()).children('.x-navigation-title');
    if (!arguments.length) return o.title;
    el.html(title);
    o.title = title;

    if (title) el.rc('x-hidden');
    else el.ac('x-hidden');
    return this;
  }

  public selected() {
    return (this._selected = this._selected || []);
  }

  public deselect(id?: string | View) {
    const selected = (this._selected = this._selected || []);
    selected.forEach((node) => {
      if (!node) return;
      if (!id || node === id || node.id === id) {
        const navitem = node as NavItem;
        navitem.active(false);
        navitem.fire('deselected');
        this.fire('deselected', { node: navitem });
        selected.splice(selected.indexOf(navitem), 1);
      }
    });
    return this;
  }

  public collapseall() {
    this.findall(NavItem).forEach((navitem) => {
      (navitem as NavItem).active(false).collapse();
    });
    return this;
  }

  public select(id: string | View) {
    if (!id) throw new Error('required select node(id/instance)');

    const view = this.find(id);
    if (!view) throw new Error(`cannot find node for select "${id}"`);

    const o = this.options() as NavigationOptions;
    const el = $(this.dom());
    const group = this.group();
    const autocollapse = this.autocollapse();

    if (!o.multiple) this.deselect();

    if (group) {
      this.workbench()
        .query('[data-navigation-group="' + group + '"]')
        .forEach((element) => {
          const navigation = element.view as Navigation;
          if (navigation === this) return;
          if (typeof navigation.deselect === 'function') {
            navigation.deselect();
            const ac = navigation.autocollapse();
            navigation.findall(NavItem).forEach((navitem) => {
              (navitem as NavItem).active(false);
              if (ac) (navitem as NavItem).collapse();
            });
          }
        });
    }

    this.findall(NavItem).forEach((item) => {
      const navitem = item as NavItem;

      if (navitem === view) (navitem as NavItem).active();
      else if (navitem.dom().contains(view.dom())) navitem.expand().active();
      else if (autocollapse) navitem.collapse().active(false);
    });

    if (!~this._selected.indexOf(view)) {
      this._selected.push(view);
      view.fire('selected');
      this.fire('selected', { node: view });
    }
    return this;
  }
}
