import '@attrs/style';
import { Workbench, View, Separator } from './base';
import { dashboard } from './presets';
import { Block, Label, Navigation, NavItem, Tabbed, Cards, Profile, Anchor, Button, Navbar, Dropdown, ListItem } from './components';

View.type('view', View);
View.type('separator', Separator);
View.type('block', Block);
View.type('label', Label);
View.type('navigation', Navigation);
View.type('navitem', NavItem);
View.type('tabbed', Tabbed);
View.type('cards', Cards);
View.type('profile', Profile);
View.type('anchor', Anchor);
View.type('button', Button);
View.type('navbar', Navbar);
View.type('dropdown', Dropdown);
View.type('listitem', ListItem);
View.deftype(Block);
Workbench.preset('dashboard', dashboard);

export * from './base';
export * from './components';
export * from './state';
export * from './presets';
