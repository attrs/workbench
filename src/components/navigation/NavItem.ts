import $ from 'tinyselector';
import { View, ContainerOptions, Container } from '../../base';

export class NavItemOptions extends ContainerOptions {
  public text?: string;
  public link?: string;
  public badge?: string;
  public target?: string;
}

export class NavItem extends Container {
  constructor(options: NavItemOptions) {
    super(options);
  }

  public create() {
    return $('<li class="x-navitem">\
        <a>\
          <div class="tools"></div>\
        </a>\
    </li>')[0];
  }

  public init() {
    const el = $(this.dom());

    this.on('matchstate', (e) => {
      this.select();
    })
      .on('options', (e) => {
        this.render();
      })
      .on('additem', (e) => {
        const item = e.detail?.item;
        const index = e.detail?.index;
        const view = View.create(item, 'navitem');
        let ul = el.children('ul');
        view.dom()._item = item;

        if (!ul.length) {
          el.children('a').children('.tools').append('<span class="x-caret">');
          ul = el.append('<ul class="x-navitem-items">').children('ul');
        }

        ul.append(view.dom(), index);
      })
      .on('removeitem', (e) => {
        const ul = el.children('ul');
        ul.children().each((i, node) => {
          if (e.detail?.item === node._item) $(node).remove();
        });
      });

    super.init();
    this.render();

    el.children('a').on('click', (e) => {
      this.toggle().select();
    });
  }

  public isexpand() {
    return $(this.dom()).hc('x-navitem-expand');
  }

  public expand() {
    $(this.dom()).ac('x-navitem-expand');
    return this;
  }

  public collapse() {
    $(this.dom()).rc('x-navitem-expand');
    return this;
  }

  public toggle() {
    if (this.isexpand()) {
      this.collapse();
    } else {
      this.expand();
    }
    return this;
  }

  public isactive() {
    return $(this.dom()).hc('x-navitem-active');
  }

  public active(b?: boolean) {
    const el = $(this.dom());
    if (!arguments.length) b = true;
    if (b) el.ac('x-navitem-active');
    else el.rc('x-navitem-active');
    return this;
  }

  // with navigation
  public navigation() {
    return $(this.dom())
      .parent((node) => {
        return node.view && $(node).hc('x-navigation');
      })
      .map((p) => {
        return p && p.view;
      })[0];
  }

  public isselected() {
    const navigation = this.navigation();
    return ~navigation.selected().indexOf(this) ? true : false;
  }

  public select() {
    const navigation = this.navigation();
    if (navigation) navigation.select(this);
    return this;
  }

  public link(link?: string): NavItem | string | null {
    const o = this.options() as NavItemOptions;
    if (!arguments.length) return o.link || null;
    o.link = link;
    return this.render();
  }

  public target(target?: string): NavItem | string | null {
    const o = this.options() as NavItemOptions;
    if (!arguments.length) return o.target || null;
    o.target = target;
    return this.render();
  }

  public icon(icon?: string): NavItem | string | null {
    const o = this.options() as NavItemOptions;
    if (!arguments.length) return o.icon || null;
    o.icon = icon;
    return this.render();
  }

  public text(text?: string): NavItem | string | null {
    const o = this.options() as NavItemOptions;
    if (!arguments.length) return o.text || null;
    o.text = text;
    return this.render();
  }

  public badge(badge?: string): NavItem | string | null {
    const o = this.options() as NavItemOptions;
    if (!arguments.length) return o.badge || null;
    o.badge = badge;
    return this.render();
  }

  public render() {
    const el = $(this.dom());
    const anchor = el.children('a');
    const tools = anchor.children('.tools');
    const ul = el.children('ul');
    const o = this.options() as NavItemOptions;

    anchor.attr('href', o.link);
    anchor.attr('target', o.target || null);
    anchor.html(`${o.icon || ''} ${o.text || ''}`);

    tools.html(`${(o.badge && '<span class="x-badge">' + o.badge + '</span>') || ''}`);

    if (!ul.length) {
      tools.append('<span class="x-caret">');
    }

    return this;
  }
}
