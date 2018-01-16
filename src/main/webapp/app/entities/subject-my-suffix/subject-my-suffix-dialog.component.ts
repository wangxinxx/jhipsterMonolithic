import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SubjectMySuffix } from './subject-my-suffix.model';
import { SubjectMySuffixPopupService } from './subject-my-suffix-popup.service';
import { SubjectMySuffixService } from './subject-my-suffix.service';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-subject-my-suffix-dialog',
    templateUrl: './subject-my-suffix-dialog.component.html'
})
export class SubjectMySuffixDialogComponent implements OnInit {

    subject: SubjectMySuffix;
    isSaving: boolean;

    subjects: SubjectMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
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
        if (this.subject.id !== undefined) {
            this.subscribeToSaveResponse(
                this.subjectService.update(this.subject));
        } else {
            this.subscribeToSaveResponse(
                this.subjectService.create(this.subject));
        }
    }

    private subscribeToSaveResponse(result: Observable<SubjectMySuffix>) {
        result.subscribe((res: SubjectMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: SubjectMySuffix) {
        this.eventManager.broadcast({ name: 'subjectListModification', content: 'OK'});
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
    selector: 'jhi-subject-my-suffix-popup',
    template: ''
})
export class SubjectMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private subjectPopupService: SubjectMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.subjectPopupService
                    .open(SubjectMySuffixDialogComponent as Component, params['id']);
            } else {
                this.subjectPopupService
                    .open(SubjectMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
