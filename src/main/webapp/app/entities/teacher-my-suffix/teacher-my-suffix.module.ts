import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterMonolithicSharedModule } from '../../shared';
import {
    TeacherMySuffixService,
    TeacherMySuffixPopupService,
    TeacherMySuffixComponent,
    TeacherMySuffixDetailComponent,
    TeacherMySuffixDialogComponent,
    TeacherMySuffixPopupComponent,
    TeacherMySuffixDeletePopupComponent,
    TeacherMySuffixDeleteDialogComponent,
    teacherRoute,
    teacherPopupRoute,
    TeacherMySuffixResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...teacherRoute,
    ...teacherPopupRoute,
];

@NgModule({
    imports: [
        JhipsterMonolithicSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TeacherMySuffixComponent,
        TeacherMySuffixDetailComponent,
        TeacherMySuffixDialogComponent,
        TeacherMySuffixDeleteDialogComponent,
        TeacherMySuffixPopupComponent,
        TeacherMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        TeacherMySuffixComponent,
        TeacherMySuffixDialogComponent,
        TeacherMySuffixPopupComponent,
        TeacherMySuffixDeleteDialogComponent,
        TeacherMySuffixDeletePopupComponent,
    ],
    providers: [
        TeacherMySuffixService,
        TeacherMySuffixPopupService,
        TeacherMySuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterMonolithicTeacherMySuffixModule {}
