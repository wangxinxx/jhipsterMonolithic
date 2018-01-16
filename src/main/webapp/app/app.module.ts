import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2Webstorage } from 'ngx-webstorage';

// Core providers
import {CoreModule} from "./core/core.module";
import {SmartadminLayoutModule} from "./shared/layout/layout.module";

import { JhipsterMonolithicSharedModule, UserRouteAccessService } from './shared';
import { JhipsterMonolithicAppRoutingModule} from './app-routing.module';
import { JhipsterMonolithicHomeModule } from './home/home.module';
import { JhipsterMonolithicAdminModule } from './admin/admin.module';
import { JhipsterMonolithicAccountModule } from './account/account.module';
import { JhipsterMonolithicEntityModule } from './entities/entity.module';
import { customHttpProvider } from './blocks/interceptor/http.provider';
import { PaginationConfig } from './blocks/config/uib-pagination.config';

// jhipster-needle-angular-add-module-import JHipster will add new module here

import {
    JhiMainComponent,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ActiveMenuDirective,
    ErrorComponent
} from './layouts';

@NgModule({
    imports: [
        BrowserModule,
        JhipsterMonolithicAppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        JhipsterMonolithicSharedModule,
        JhipsterMonolithicHomeModule,
        JhipsterMonolithicAdminModule,
        JhipsterMonolithicAccountModule,
        JhipsterMonolithicEntityModule,
        CoreModule,
        SmartadminLayoutModule,
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        ActiveMenuDirective,
        FooterComponent,
    ],
    providers: [
        ProfileService,
        customHttpProvider(),
        PaginationConfig,
        UserRouteAccessService
    ],
    bootstrap: [ JhiMainComponent ]
})
export class JhipsterMonolithicAppModule {}
