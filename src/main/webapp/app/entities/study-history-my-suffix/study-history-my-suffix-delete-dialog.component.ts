import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { StudyHistoryMySuffix } from './study-history-my-suffix.model';
import { StudyHistoryMySuffixPopupService } from './study-history-my-suffix-popup.service';
import { StudyHistoryMySuffixService } from './study-history-my-suffix.service';

@Component({
    selector: 'jhi-study-history-my-suffix-delete-dialog',
    templateUrl: './study-history-my-suffix-delete-dialog.component.html'
})
export class StudyHistoryMySuffixDeleteDialogComponent {

    studyHistory: StudyHistoryMySuffix;

    constructor(
        private studyHistoryService: StudyHistoryMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.studyHistoryService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'studyHistoryListModification',
                content: 'Deleted an studyHistory'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-study-history-my-suffix-delete-popup',
    template: ''
})
export class StudyHistoryMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private studyHistoryPopupService: StudyHistoryMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.studyHistoryPopupService
                .open(StudyHistoryMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
