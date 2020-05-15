import $ from 'tinyselector';
import { View, ViewOptions } from '../../base';

export class AnchorOptions extends ViewOptions {
  public href?: string;
  public text?: string;
  public target?: string;
}

export class Anchor extends View {
  constructor(options: AnchorOptions) {
    super(options);
    this.update().on('options', (e) => {
      this.update();
    });
  }

  public create() {
    return $('<a href="javascript:;" class="xw-anchor">')[0];
  }

  public update(): Anchor {
    const o = this.options() as AnchorOptions;
    this.text(o.text);
    this.href(o.href);
    this.target(o.target);
    return this;
  }

  public text(text?: string): Anchor | string | null {
    const o = this.options() as AnchorOptions;
    const el = $(this.dom());
    if( !arguments.length ) return o.text || null;
    el.html(text);
    o.text = text;
    return this;
  }

  public href(href?: string): Anchor | string | null {
    const o = this.options() as AnchorOptions;
    const el = $(this.dom());
    if( !arguments.length ) return o.href || null;
    el.attr('href', href || 'javascript:;');
    o.href = href || '';
    return this;
  }

  public target(target?: string): Anchor | string | null {
    const o = this.options() as AnchorOptions;
    const el = $(this.dom());
    if( !arguments.length ) return o.target || null;
    el.attr('target', target);
    o.target = target;
    return this;
  }
}