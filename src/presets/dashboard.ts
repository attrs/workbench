export const dashboard = {
  target: 'page',
  view: {
    flexbox: 'horizontal',
    flex: 1,
    items: [
      {
        type: 'navbar',
        id: 'perspective',
        cls: 'x-navbar-v bg-panel border-r'
      },
      {
        flexbox: 'vertical',
        flex: 1,
        items: [
          {
            id: 'topbar',
            style: {
              '-webkit-app-region': 'drag'
            },
            cls: 'bg-panel border-b pr-1',
            flexbox: 'horizontal',
            items: [
              {
                id: 'topnav',
                flex: 1,
                flexbox: 'horizontal',
                items: [
                  {
                    id: 'logo',
                    cls: 'text-xl font-thin px-5',
                    type: 'navbar',
                    width: 250
                  },
                  {
                    id: 'topnav-left',
                    type: 'navbar'
                  },
                  {
                    id: 'topnav-right',
                    type: 'navbar',
                    cls: 'x-navbar-align-end',
                    flex: 1
                  }
                ]
              }
            ]
          },
          {
            id: 'center',
            flexbox: 'horizontal',
            flex: 1,
            items: [
              {
                id: 'sidebar',
                flexbox: 'vertical',
                width: 250,
                cls: 'bg-panel border-r',
                items: [
                  {
                    id: 'sidebar-navigation',
                    type: 'block'
                  }
                ]
              },
              {
                id: 'page',
                flexbox: 'vertical',
                flex: 1
              }
            ]
          }
        ]
      }
    ]
  }
};
