import $ from 'tinyselector';
import { View, ViewOptions, DOMElement } from '../../base';
import { Anchor, AnchorOptions } from '../anchor';

export class ProfileOptions extends ViewOptions {
  public text?: string;
  public image?: string;
  public links?: AnchorOptions | AnchorOptions[];
}

export class Profile extends View {
  constructor(options: ProfileOptions) {
    super(options);
  }

  public create() {
    return $(
      '<div class="x-profile">\
      <div class="x-profile-image x-hidden">\
        <div class="x-profile-image-body"></div>\
      </div>\
      <div class="x-profile-body">\
        <div class="x-profile-links">\
        </div>\
        <div class="x-profile-text">\
          Text\
        </div>\
      </div>\
    </div>'
    )[0];
  }

  public init() {
    super.init();

    const o = this.options() as ProfileOptions;
    this.text(o.text);
    this.image(o.image);
    this.links(o.links);
  }

  public body() {
    return this.dom().querySelector('.x-profile-text') as DOMElement;
  }

  public text(text) {
    const o = this.options() as ProfileOptions;
    const el = $(this.dom()).find('.x-profile-text');
    if (!arguments.length) return o.text;
    el.html(text);
    o.text = text;
    return this;
  }

  public image(image) {
    const o = this.options() as ProfileOptions;
    const el = $(this.dom()).children('.x-profile-image');
    if (!arguments.length) return o.image;

    el.children('.x-profile-image-body').css('background-image', 'url(' + image + ')');

    if (image) el.rc('x-hidden');
    else el.ac('x-hidden');

    o.image = image;
    return this;
  }

  public links(links) {
    const o = this.options() as ProfileOptions;
    const el = $(this.dom()).find('.x-profile-links');
    if (!arguments.length) return o.links;
    if (links && !Array.isArray(links)) links = [links];

    el.empty();

    links?.forEach((link) => {
      if (typeof link === 'string') link = { text: link };
      if (typeof link !== 'object') return;

      el.append(new Anchor(link).dom());
    });

    o.links = links;
    return this;
  }
}
