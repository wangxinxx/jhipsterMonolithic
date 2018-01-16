import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CourseMySuffix } from './course-my-suffix.model';
import { CourseMySuffixPopupService } from './course-my-suffix-popup.service';
import { CourseMySuffixService } from './course-my-suffix.service';
import { SubjectMySuffix, SubjectMySuffixService } from '../subject-my-suffix';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-course-my-suffix-dialog',
    templateUrl: './course-my-suffix-dialog.component.html'
})
export class CourseMySuffixDialogComponent implements OnInit {

    course: CourseMySuffix;
    isSaving: boolean;

    subjects: SubjectMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private courseService: CourseMySuffixService,
        private subjectService: SubjectMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.subjectService.query()
            .subscribe((res: ResponseWrapper) => { this.subjects = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.course.id !== undefined) {
            this.subscribeToSaveResponse(
                this.courseService.update(this.course));
        } else {
            this.subscribeToSaveResponse(
                this.courseService.create(this.course));
        }
    }

    private subscribeToSaveResponse(result: Observable<CourseMySuffix>) {
        result.subscribe((res: CourseMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: CourseMySuffix) {
        this.eventManager.broadcast({ name: 'courseListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackSubjectById(index: number, item: SubjectMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-course-my-suffix-popup',
    template: ''
})
export class CourseMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private coursePopupService: CourseMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.coursePopupService
                    .open(CourseMySuffixDialogComponent as Component, params['id']);
            } else {
                this.coursePopupService
                    .open(CourseMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
