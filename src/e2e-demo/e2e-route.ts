import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RootComponent } from './root-app/root-app';
import { ButtonComponent } from './button/button-e2e';

const routes: Routes = [
    { path: '', redirectTo: 'button', pathMatch: 'full' },
    { path: 'button', component: ButtonComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { useHash: true })
    ],
    exports: [
        RouterModule
    ]
})
export class E2ERouterModule {}
