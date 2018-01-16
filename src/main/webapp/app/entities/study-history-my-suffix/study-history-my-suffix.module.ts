import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterMonolithicSharedModule } from '../../shared';
import {
    StudyHistoryMySuffixService,
    StudyHistoryMySuffixPopupService,
    StudyHistoryMySuffixComponent,
    StudyHistoryMySuffixDetailComponent,
    StudyHistoryMySuffixDialogComponent,
    StudyHistoryMySuffixPopupComponent,
    StudyHistoryMySuffixDeletePopupComponent,
    StudyHistoryMySuffixDeleteDialogComponent,
    studyHistoryRoute,
    studyHistoryPopupRoute,
    StudyHistoryMySuffixResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...studyHistoryRoute,
    ...studyHistoryPopupRoute,
];

@NgModule({
    imports: [
        JhipsterMonolithicSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        StudyHistoryMySuffixComponent,
        StudyHistoryMySuffixDetailComponent,
        StudyHistoryMySuffixDialogComponent,
        StudyHistoryMySuffixDeleteDialogComponent,
        StudyHistoryMySuffixPopupComponent,
        StudyHistoryMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        StudyHistoryMySuffixComponent,
        StudyHistoryMySuffixDialogComponent,
        StudyHistoryMySuffixPopupComponent,
        StudyHistoryMySuffixDeleteDialogComponent,
        StudyHistoryMySuffixDeletePopupComponent,
    ],
    providers: [
        StudyHistoryMySuffixService,
        StudyHistoryMySuffixPopupService,
        StudyHistoryMySuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterMonolithicStudyHistoryMySuffixModule {}
