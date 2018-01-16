import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { StudyHistoryMySuffix } from './study-history-my-suffix.model';
import { StudyHistoryMySuffixService } from './study-history-my-suffix.service';

@Component({
    selector: 'jhi-study-history-my-suffix-detail',
    templateUrl: './study-history-my-suffix-detail.component.html'
})
export class StudyHistoryMySuffixDetailComponent implements OnInit, OnDestroy {

    studyHistory: StudyHistoryMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private studyHistoryService: StudyHistoryMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInStudyHistories();
    }

    load(id) {
        this.studyHistoryService.find(id).subscribe((studyHistory) => {
            this.studyHistory = studyHistory;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInStudyHistories() {
        this.eventSubscriber = this.eventManager.subscribe(
            'studyHistoryListModification',
            (response) => this.load(this.studyHistory.id)
        );
    }
}
