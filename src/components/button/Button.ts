import $ from 'tinyselector';
import { ContainerOptions, Container } from '../../base';

export class ButtonOptions extends ContainerOptions {
  public icon?: string;
  public text?: string;
  public link?: string;
  public target?: string;
  public badge?: string;
}

export class Button extends Container {
  constructor(options?: ButtonOptions) {
    super(options);
  }

  public create() {
    return $('<a class="btn"></a>')[0];
  }

  public init() {
    this.on('options', (e) => this.render());
    super.init();
    this.render();
  }

  public link(link?: string): Button | string | null {
    const o = this.options() as ButtonOptions;
    if (!arguments.length) return o.link || null;
    o.link = link;
    return this.render();
  }

  public target(target?: string): Button | string | null {
    const o = this.options() as ButtonOptions;
    if (!arguments.length) return o.target || null;
    o.target = target;
    return this.render();
  }

  public icon(icon?: string): Button | string | null {
    const o = this.options() as ButtonOptions;
    if (!arguments.length) return o.icon || null;
    o.icon = icon;
    return this.render();
  }

  public text(text?: string): Button | string | null {
    const o = this.options() as ButtonOptions;
    if (!arguments.length) return o.text || null;
    o.text = text;
    return this.render();
  }

  public badge(badge?: string): Button | string | null {
    const o = this.options() as ButtonOptions;
    if (!arguments.length) return o.badge || null;
    o.badge = badge;
    return this.render();
  }

  public render() {
    const el = $(this.dom());
    const btn = el.hc('btn') ? el : el.find('a.btn');
    const o = this.options() as ButtonOptions;

    btn.attr('href', o.link || 'javascript:;');
    btn.attr('target', o.target || null);
    btn.html(`${o.icon || ''} ${o.text || ''} ${(o.badge && '<span class="x-badge">' + o.badge + '</span>') || ''}`);
    if (o.icon && !(o.text || o.badge)) btn.ac('btn-icon');
    else btn.rc('btn-icon');
    return this;
  }
}
