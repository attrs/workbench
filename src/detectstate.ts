import $ from 'tinyselector';

const wrap = (type) => {
  const o = history[type];
  return (...arg) => {
    const result = o.apply(history, arg);
    
    findandfire({
      type: type.toLowerCase(),
      state: arg[0],
      href: arg[2]
    });
    return result;
  };
};

const findandfire = (detail) => {
  $('.xw-state-responder').each((node) => {
    if( !node.view ) return;
    const view = node.view;
    const responder = view.state();
    
    if( typeof responder === 'function' && responder(detail) ) {
      node.view.fire('matchstate', detail);
    }
  });
};

history.pushState = wrap('pushState');
history.replaceState = wrap('replaceState');

window.addEventListener('popstate', (e) => {
  findandfire({
    type: 'popstate',
    state: history.state,
    href: location.pathname
  });
});

export const detectstate = () => {
  findandfire({
    type: 'init',
    state: history.state,
    href: location.pathname
  });
};
