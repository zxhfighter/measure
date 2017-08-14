import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';

const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'demo'},
    {path: 'demo', loadChildren: './demo/demo.module#DemoModule'}
];

const rootRouterModule = RouterModule.forRoot(routes, {useHash: true});
export {rootRouterModule};
