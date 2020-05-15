import $ from 'tinyselector';
import { View, ViewOptions } from '../../base';
import { Anchor } from '../anchor';
export class ProfileOptions extends ViewOptions {
}
export class Profile extends View {
    constructor(options) {
        super(options);
        this.update();
    }
    create() {
        return $('<div class="xw-profile">\
      <div class="xw-profile-image xw-hidden">\
        <div class="xw-profile-image-body"></div>\
      </div>\
      <div class="xw-profile-body">\
        <div class="xw-profile-links">\
        </div>\
        <div class="xw-profile-text">\
          Text\
        </div>\
      </div>\
    </div>')[0];
    }
    body() {
        return this.dom().querySelector('.xw-profile-text');
    }
    update() {
        const o = this.options();
        this.text(o.text);
        this.image(o.image);
        this.links(o.links);
    }
    text(text) {
        const o = this.options();
        const el = $(this.dom()).find('.xw-profile-text');
        if (!arguments.length)
            return o.text;
        el.html(text);
        o.text = text;
        return this;
    }
    image(image) {
        const o = this.options();
        const el = $(this.dom()).children('.xw-profile-image');
        if (!arguments.length)
            return o.image;
        el.children('.xw-profile-image-body').css('background-image', 'url(' + image + ')');
        if (image)
            el.rc('xw-hidden');
        else
            el.ac('xw-hidden');
        o.image = image;
        return this;
    }
    links(links) {
        const o = this.options();
        const el = $(this.dom()).find('.xw-profile-links');
        if (!arguments.length)
            return o.links;
        if (links && !Array.isArray(links))
            links = [links];
        el.empty();
        links &&
            links.forEach((link) => {
                if (typeof link === 'string')
                    link = { text: link };
                if (typeof link !== 'object')
                    return;
                el.append(new Anchor(link).dom());
            });
        o.links = links;
        return this;
    }
}
//# sourceMappingURL=Profile.js.map