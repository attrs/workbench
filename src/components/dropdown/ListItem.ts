import $ from 'tinyselector';
import { View, ContainerOptions, Container } from '../../base';

export class ListItemOptions extends ContainerOptions {
  public text?: string;
  public link?: string;
  public badge?: string;
  public target?: string;
}

export class ListItem extends Container {
  constructor(options: ListItemOptions) {
    super(options);
  }

  public create() {
    return $('<a class="x-list-item">\
        <div class="tools"></div>\
      </a>')[0];
  }

  public init() {
    const el = $(this.dom());

    this.on('options', (e) => {
      this.render();
    });

    super.init();
    this.render();
  }

  public link(link?: string): ListItem | string | null {
    const o = this.options() as ListItemOptions;
    if (!arguments.length) return o.link || null;
    o.link = link;
    return this.render();
  }

  public target(target?: string): ListItem | string | null {
    const o = this.options() as ListItemOptions;
    if (!arguments.length) return o.target || null;
    o.target = target;
    return this.render();
  }

  public icon(icon?: string): ListItem | string | null {
    const o = this.options() as ListItemOptions;
    if (!arguments.length) return o.icon || null;
    o.icon = icon;
    return this.render();
  }

  public text(text?: string): ListItem | string | null {
    const o = this.options() as ListItemOptions;
    if (!arguments.length) return o.text || null;
    o.text = text;
    return this.render();
  }

  public badge(badge?: string): ListItem | string | null {
    const o = this.options() as ListItemOptions;
    if (!arguments.length) return o.badge || null;
    o.badge = badge;
    return this.render();
  }

  public render() {
    const el = $(this.dom());
    const anchor = el;
    const tools = anchor.children('.tools');
    const ul = el.children('ul');
    const o = this.options() as ListItemOptions;

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
