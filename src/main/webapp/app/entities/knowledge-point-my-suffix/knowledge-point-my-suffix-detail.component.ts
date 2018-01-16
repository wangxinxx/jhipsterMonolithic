import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { KnowledgePointMySuffix } from './knowledge-point-my-suffix.model';
import { KnowledgePointMySuffixService } from './knowledge-point-my-suffix.service';

@Component({
    selector: 'jhi-knowledge-point-my-suffix-detail',
    templateUrl: './knowledge-point-my-suffix-detail.component.html'
})
export class KnowledgePointMySuffixDetailComponent implements OnInit, OnDestroy {

    knowledgePoint: KnowledgePointMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private knowledgePointService: KnowledgePointMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInKnowledgePoints();
    }

    load(id) {
        this.knowledgePointService.find(id).subscribe((knowledgePoint) => {
            this.knowledgePoint = knowledgePoint;
        });
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInKnowledgePoints() {
        this.eventSubscriber = this.eventManager.subscribe(
            'knowledgePointListModification',
            (response) => this.load(this.knowledgePoint.id)
        );
    }
}
