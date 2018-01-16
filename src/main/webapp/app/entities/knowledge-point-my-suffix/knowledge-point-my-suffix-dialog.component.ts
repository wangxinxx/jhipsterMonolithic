import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { KnowledgePointMySuffix } from './knowledge-point-my-suffix.model';
import { KnowledgePointMySuffixPopupService } from './knowledge-point-my-suffix-popup.service';
import { KnowledgePointMySuffixService } from './knowledge-point-my-suffix.service';
import { TeacherMySuffix, TeacherMySuffixService } from '../teacher-my-suffix';
import { CourseMySuffix, CourseMySuffixService } from '../course-my-suffix';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-knowledge-point-my-suffix-dialog',
    templateUrl: './knowledge-point-my-suffix-dialog.component.html'
})
export class KnowledgePointMySuffixDialogComponent implements OnInit {

    knowledgePoint: KnowledgePointMySuffix;
    isSaving: boolean;

    knowledgepoints: KnowledgePointMySuffix[];

    teachers: TeacherMySuffix[];

    courses: CourseMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private knowledgePointService: KnowledgePointMySuffixService,
        private teacherService: TeacherMySuffixService,
        private courseService: CourseMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.knowledgePointService.query()
            .subscribe((res: ResponseWrapper) => { this.knowledgepoints = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.teacherService.query()
            .subscribe((res: ResponseWrapper) => { this.teachers = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.courseService.query()
            .subscribe((res: ResponseWrapper) => { this.courses = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.knowledgePoint.id !== undefined) {
            this.subscribeToSaveResponse(
                this.knowledgePointService.update(this.knowledgePoint));
        } else {
            this.subscribeToSaveResponse(
                this.knowledgePointService.create(this.knowledgePoint));
        }
    }

    private subscribeToSaveResponse(result: Observable<KnowledgePointMySuffix>) {
        result.subscribe((res: KnowledgePointMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: KnowledgePointMySuffix) {
        this.eventManager.broadcast({ name: 'knowledgePointListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackKnowledgePointById(index: number, item: KnowledgePointMySuffix) {
        return item.id;
    }

    trackTeacherById(index: number, item: TeacherMySuffix) {
        return item.id;
    }

    trackCourseById(index: number, item: CourseMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-knowledge-point-my-suffix-popup',
    template: ''
})
export class KnowledgePointMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private knowledgePointPopupService: KnowledgePointMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.knowledgePointPopupService
                    .open(KnowledgePointMySuffixDialogComponent as Component, params['id']);
            } else {
                this.knowledgePointPopupService
                    .open(KnowledgePointMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
