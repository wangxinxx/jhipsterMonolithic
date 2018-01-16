import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { StudyHistoryMySuffix } from './study-history-my-suffix.model';
import { StudyHistoryMySuffixPopupService } from './study-history-my-suffix-popup.service';
import { StudyHistoryMySuffixService } from './study-history-my-suffix.service';
import { CourseMySuffix, CourseMySuffixService } from '../course-my-suffix';
import { KnowledgePointMySuffix, KnowledgePointMySuffixService } from '../knowledge-point-my-suffix';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-study-history-my-suffix-dialog',
    templateUrl: './study-history-my-suffix-dialog.component.html'
})
export class StudyHistoryMySuffixDialogComponent implements OnInit {

    studyHistory: StudyHistoryMySuffix;
    isSaving: boolean;

    courses: CourseMySuffix[];

    knowledgepoints: KnowledgePointMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private studyHistoryService: StudyHistoryMySuffixService,
        private courseService: CourseMySuffixService,
        private knowledgePointService: KnowledgePointMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.courseService.query()
            .subscribe((res: ResponseWrapper) => { this.courses = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.knowledgePointService.query()
            .subscribe((res: ResponseWrapper) => { this.knowledgepoints = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.studyHistory.id !== undefined) {
            this.subscribeToSaveResponse(
                this.studyHistoryService.update(this.studyHistory));
        } else {
            this.subscribeToSaveResponse(
                this.studyHistoryService.create(this.studyHistory));
        }
    }

    private subscribeToSaveResponse(result: Observable<StudyHistoryMySuffix>) {
        result.subscribe((res: StudyHistoryMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: StudyHistoryMySuffix) {
        this.eventManager.broadcast({ name: 'studyHistoryListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCourseById(index: number, item: CourseMySuffix) {
        return item.id;
    }

    trackKnowledgePointById(index: number, item: KnowledgePointMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-study-history-my-suffix-popup',
    template: ''
})
export class StudyHistoryMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private studyHistoryPopupService: StudyHistoryMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.studyHistoryPopupService
                    .open(StudyHistoryMySuffixDialogComponent as Component, params['id']);
            } else {
                this.studyHistoryPopupService
                    .open(StudyHistoryMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
