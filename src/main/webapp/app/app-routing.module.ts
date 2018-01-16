import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { errorRoute, navbarRoute } from './layouts';
import {MainLayoutComponent} from "./shared/layout/app-layouts/main-layout.component";

const LAYOUT_ROUTES = [
    navbarRoute,
    ...errorRoute,
    {
        path: 'smartadmin',
        component: MainLayoutComponent,
        children: [
            {
                path: '', redirectTo: 'home', pathMatch: 'full'
            },
            {
                path: 'home',
                loadChildren: 'app/+home/home.module#HomeModule'
            },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(LAYOUT_ROUTES, { useHash: true })
    ],
    exports: [
        RouterModule
    ]
})
export class JhipsterMonolithicAppRoutingModule {}
