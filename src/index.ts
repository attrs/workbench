import './css/index.css';
import { Workbench, View, Separator } from './base';
import { dashboard } from './presets';
import { Block, Label, Navigation, NavItem, Tabbed, Cards, Profile, Anchor, Button, Toolbar } from './components';

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
View.type('toolbar', Toolbar);
View.deftype(Block);
Workbench.preset('dashboard', dashboard);

export * from './base';
export * from './components';
export * from './state';
export * from './presets';
