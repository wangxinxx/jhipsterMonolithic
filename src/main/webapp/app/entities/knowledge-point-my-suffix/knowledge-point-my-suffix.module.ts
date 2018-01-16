import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterMonolithicSharedModule } from '../../shared';
import {
    KnowledgePointMySuffixService,
    KnowledgePointMySuffixPopupService,
    KnowledgePointMySuffixComponent,
    KnowledgePointMySuffixDetailComponent,
    KnowledgePointMySuffixDialogComponent,
    KnowledgePointMySuffixPopupComponent,
    KnowledgePointMySuffixDeletePopupComponent,
    KnowledgePointMySuffixDeleteDialogComponent,
    knowledgePointRoute,
    knowledgePointPopupRoute,
    KnowledgePointMySuffixResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...knowledgePointRoute,
    ...knowledgePointPopupRoute,
];

@NgModule({
    imports: [
        JhipsterMonolithicSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        KnowledgePointMySuffixComponent,
        KnowledgePointMySuffixDetailComponent,
        KnowledgePointMySuffixDialogComponent,
        KnowledgePointMySuffixDeleteDialogComponent,
        KnowledgePointMySuffixPopupComponent,
        KnowledgePointMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        KnowledgePointMySuffixComponent,
        KnowledgePointMySuffixDialogComponent,
        KnowledgePointMySuffixPopupComponent,
        KnowledgePointMySuffixDeleteDialogComponent,
        KnowledgePointMySuffixDeletePopupComponent,
    ],
    providers: [
        KnowledgePointMySuffixService,
        KnowledgePointMySuffixPopupService,
        KnowledgePointMySuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterMonolithicKnowledgePointMySuffixModule {}
