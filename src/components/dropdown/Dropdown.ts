import $ from 'tinyselector';
import { View, ContainerOptions, Container, DOMElement } from '../../base';
import { Button } from '../button';

export class DropdownOptions extends ContainerOptions {
  public icon?: string;
  public text?: string;
  public link?: string;
  public target?: string;
  public badge?: string;
  public ddalign?: string;
}

export class Dropdown extends Button {
  constructor(options?: DropdownOptions) {
    super(options);
  }

  public create() {
    return $(
      '<div class="x-dropdown x-dropdown-nocaret">\
        <a class="btn"></a>\
        <div class="x-dropdown-items">\
          <div class="x-contextmenu">\
            <div class="x-list min-w-200"></div>\
          </div>\
        </div>\
      </div>'
    )[0];
  }

  public init() {
    const o = this.options() as DropdownOptions;
    const el = $(this.dom());
    const menulist = el.find('.x-list');

    this.ddalign(o.ddalign);

    this.on('options', (e) => {
      super.render();
      this.ddalign(e.detail?.options.ddalign);
    })
      .on('additem', (e) => {
        const item = e.detail?.item;
        const index = e.detail?.index;
        const view = View.create(item, 'listitem');
        view.dom()._item = item;

        el.rc('x-dropdown-nocaret');
        menulist.append(view.dom(), index);
      })
      .on('removeitem', (e) => {
        menulist.children().each((i, node) => {
          if (e.detail?.item === node._item) $(node).remove();
        });

        if (!menulist.children().length) {
          el.rc('x-dropdown-nocaret');
        }
      })
      .on('click', () => {
        this.toggleopen();
      });

    $(document).on('click', (e) => {
      if (el[0].contains(e.target)) return;
      this.open(false);
    });

    super.render();
    super.init();
  }

  public body(): DOMElement {
    return this.dom().querySelector('.x-list') as DOMElement;
  }

  public ddalign(ddalign) {
    const o = this.options() as DropdownOptions;
    const el = $(this.dom());
    if (!arguments.length) return o.ddalign;

    ddalign = (ddalign && ddalign.split(' ')) || [];
    el.rc('x-dropdown-align-right').rc('x-dropdown-align-center').rc('x-dropdown-align-up');
    if (~ddalign.indexOf('right')) el.ac('x-dropdown-align-right');
    if (~ddalign.indexOf('center')) el.ac('x-dropdown-align-center');
    if (~ddalign.indexOf('up')) el.ac('x-dropdown-align-up');
    o.ddalign = ddalign.join(' ');

    return this;
  }

  public isopen() {
    return $(this.dom()).hc('x-dropdown-open');
  }

  public open(b) {
    const el = $(this.dom());
    if (!arguments.length) b = true;

    if (b) {
      el.ac('x-dropdown-open');
    } else {
      el.rc('x-dropdown-open');
    }
    return this;
  }

  public toggleopen() {
    return this.open(!this.isopen());
  }
}
