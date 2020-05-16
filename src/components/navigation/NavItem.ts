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
    return $(
      '<li class="xw-navitem">\
        <a href="javascript:;">\
          <span class="xw-navitem-icon"></span>\
          <span class="xw-navitem-text"></span>\
          <div class="xw-navitem-acc">\
            <span class="xw-navitem-badge"></span>\
          </div>\
        </a>\
    </li>'
    )[0];
  }

  public init() {
    const options = this.options() as NavItemOptions;
    const el = $(this.dom());

    this.text(options.text);
    this.icon(options.icon);
    this.link(options.link);
    this.badge(options.badge);
    this.on('matchstate', (e) => {
      this.select();
    })
      .on('options', (e) => {
        this.text(e.detail?.options.text);
        this.icon(e.detail?.options.icon);
        this.link(e.detail?.options.link);
        this.badge(e.detail?.options.badge);
      })
      .on('additem', (e) => {
        const item = e.detail?.item;
        const index = e.detail?.index;
        const view = View.create(item, 'navitem');
        let ul = el.children('ul');
        view.dom()._item = item;

        if (!ul.length) {
          el.children('a').children('.xw-navitem-acc').append('<span class="xw-navitem-caret">');
          ul = el.append('<ul class="xw-navitem-items">').children('ul');
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

    el.children('a').on('click', (e) => {
      this.toggle().select();
    });
  }

  public isexpand() {
    return $(this.dom()).hc('xw-navitem-expand');
  }

  public expand() {
    $(this.dom()).ac('xw-navitem-expand');
    return this;
  }

  public collapse() {
    $(this.dom()).rc('xw-navitem-expand');
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

  public text(text?: string) {
    const o = this.options() as NavItemOptions;
    const el = $(this.dom()).find('.xw-navitem-text');
    if (!arguments.length) return o.text;
    el.html(text);
    o.text = text;
    return this;
  }

  public badge(badge?: string) {
    const o = this.options() as NavItemOptions;
    const el = $(this.dom()).find('.xw-navitem-badge');
    if (!arguments.length) return o.badge;
    el.html(badge);

    if (badge) el.css('opacity', 1);
    else el.css('opacity', 0);
    o.badge = badge;
    return this;
  }

  public icon(icon?: string) {
    const o = this.options() as NavItemOptions;
    const el = $(this.dom()).find('.xw-navitem-icon');
    if (!arguments.length) return o.icon;
    el.html(icon);
    o.icon = icon;
    return this;
  }

  public link(link?: string) {
    const o = this.options() as NavItemOptions;
    const el = $(this.dom()).children('a');
    if (!arguments.length) return o.link;
    el.attr('href', link || 'javascript:;');
    o.link = link;
    return this;
  }

  public target(target?: string) {
    const o = this.options() as NavItemOptions;
    const el = $(this.dom()).children('a');
    if (!arguments.length) return o.target;
    el.attr('target', target);
    o.target = target;
    return this;
  }

  public isactive() {
    return $(this.dom()).hc('xw-navitem-active');
  }

  public active(b?: boolean) {
    const el = $(this.dom());
    if (!arguments.length) b = true;
    if (b) el.ac('xw-navitem-active');
    else el.rc('xw-navitem-active');
    return this;
  }

  // with navigation
  public navigation() {
    return $(this.dom())
      .parent((node) => {
        return node.view && $(node).hc('xw-navigation');
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
}
