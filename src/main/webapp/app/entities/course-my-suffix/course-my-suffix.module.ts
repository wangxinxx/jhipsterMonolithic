import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterMonolithicSharedModule } from '../../shared';
import {
    CourseMySuffixService,
    CourseMySuffixPopupService,
    CourseMySuffixComponent,
    CourseMySuffixDetailComponent,
    CourseMySuffixDialogComponent,
    CourseMySuffixPopupComponent,
    CourseMySuffixDeletePopupComponent,
    CourseMySuffixDeleteDialogComponent,
    courseRoute,
    coursePopupRoute,
    CourseMySuffixResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...courseRoute,
    ...coursePopupRoute,
];

@NgModule({
    imports: [
        JhipsterMonolithicSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CourseMySuffixComponent,
        CourseMySuffixDetailComponent,
        CourseMySuffixDialogComponent,
        CourseMySuffixDeleteDialogComponent,
        CourseMySuffixPopupComponent,
        CourseMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        CourseMySuffixComponent,
        CourseMySuffixDialogComponent,
        CourseMySuffixPopupComponent,
        CourseMySuffixDeleteDialogComponent,
        CourseMySuffixDeletePopupComponent,
    ],
    providers: [
        CourseMySuffixService,
        CourseMySuffixPopupService,
        CourseMySuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterMonolithicCourseMySuffixModule {}
