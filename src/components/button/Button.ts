import $ from 'tinyselector';
import { View, ContainerOptions, Container, DOMElement } from '../../base';

export class ButtonOptions extends ContainerOptions {
  public icon?: string;
  public text?: string;
  public link?: string;
  public target?: string;
  public badge?: string;
  public ddalign?: string;
}

export class Button extends Container {
  constructor(options?: ButtonOptions) {
    super(options);
  }

  public create() {
    return $(
      '<a class="xw-button">\
      <span class="xw-button-icon xw-hidden"></span>\
      <span class="xw-button-text"></span>\
      <span class="xw-button-badge xw-hidden"></span>\
      <span class="xw-button-caret xw-hidden"></span>\
    </a>'
    )[0];
  }

  public init() {
    const o = this.options() as ButtonOptions;
    const el = $(this.dom());
    const ul = $('<ul class="xw-button-items"></ul>');

    this.icon(o.icon);
    this.text(o.text);
    this.link(o.link);
    this.target(o.target);
    this.badge(o.badge);
    this.ddalign(o.ddalign);
    this.on('options', (e) => {
      this.icon(e.detail?.options.icon);
      this.text(e.detail?.options.text);
      this.link(e.detail?.options.link);
      this.target(e.detail?.options.target);
      this.badge(e.detail?.options.badge);
      this.ddalign(e.detail?.options.ddalign);
    })
      .on('additem', (e) => {
        const item = e.detail?.item;
        const index = e.detail?.index;
        const view = View.create(item, 'navitem');
        view.dom()._item = item;

        el.find('.xw-button-caret').rc('xw-hidden');
        ul.append(view.dom(), index).appendTo(el);
      })
      .on('removeitem', (e) => {
        ul.children().each((i, node) => {
          if (e.detail?.item === node._item) $(node).remove();
        });

        if (!ul.children().length) {
          el.find('.xw-button-caret').ac('xw-hidden');
          ul.remove();
        }
      })
      .on('click', () => {
        if (el.children('.xw-button-items').length) {
          this.toggleopen();
        }
      });

    $(document).on('click', (e) => {
      if (el[0].contains(e.target)) return;
      this.open(false);
    });

    super.init();
  }

  public body(): DOMElement {
    return this.dom().querySelector('.xw-button-text') as DOMElement;
  }

  public ddalign(ddalign) {
    const o = this.options() as ButtonOptions;
    const el = $(this.dom());
    if (!arguments.length) return o.ddalign;

    ddalign = (ddalign && ddalign.split(' ')) || [];
    el.rc('xw-button-dropdown-right').rc('xw-button-dropdown-center').rc('xw-button-dropdown-up');
    if (~ddalign.indexOf('right')) el.ac('xw-button-dropdown-right');
    if (~ddalign.indexOf('center')) el.ac('xw-button-dropdown-center');
    if (~ddalign.indexOf('up')) el.ac('xw-button-dropdown-up');
    o.ddalign = ddalign.join(' ');

    return this;
  }

  public isopen() {
    return $(this.dom()).hc('xw-button-open');
  }

  public open(b) {
    const el = $(this.dom());
    if (!arguments.length) b = true;

    if (b) {
      el.ac('xw-button-open');
    } else {
      el.rc('xw-button-open');
    }
    return this;
  }

  public toggleopen() {
    return this.open(!this.isopen());
  }

  public icon(icon?: string): Button | string | null {
    const o = this.options() as ButtonOptions;
    const el = $(this.dom()).find('.xw-button-icon');
    if (!arguments.length) return o.icon || null;
    el.html(icon);
    o.icon = icon;

    if (icon) el.rc('xw-hidden');
    else el.ac('xw-hidden');
    return this;
  }

  public link(link?: string): Button | string | null {
    const o = this.options() as ButtonOptions;
    const el = $(this.dom()).children('a');
    if (!arguments.length) return o.link || null;
    el.attr('href', link || 'javascript:;');
    o.link = link;
    return this;
  }

  public target(target?: string): Button | string | null {
    const o = this.options() as ButtonOptions;
    const el = $(this.dom()).children('a');
    if (!arguments.length) return o.target || null;
    el.attr('target', target);
    o.target = target;
    return this;
  }

  public text(text?: string): Button | string | null {
    const o = this.options() as ButtonOptions;
    const el = $(this.dom()).children('.xw-button-text');
    if (!arguments.length) return o.text || null;
    el.html(text);
    o.text = text;
    return this;
  }

  public badge(badge?: string): Button | string | null {
    const o = this.options() as ButtonOptions;
    const el = $(this.dom()).find('.xw-button-badge');
    if (!arguments.length) return o.badge || null;
    el.html(badge);

    o.badge = badge;

    if (badge) el.rc('xw-hidden');
    else el.ac('xw-hidden');
    return this;
  }
}
