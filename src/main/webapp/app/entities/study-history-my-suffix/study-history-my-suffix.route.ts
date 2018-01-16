import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { StudyHistoryMySuffixComponent } from './study-history-my-suffix.component';
import { StudyHistoryMySuffixDetailComponent } from './study-history-my-suffix-detail.component';
import { StudyHistoryMySuffixPopupComponent } from './study-history-my-suffix-dialog.component';
import { StudyHistoryMySuffixDeletePopupComponent } from './study-history-my-suffix-delete-dialog.component';

@Injectable()
export class StudyHistoryMySuffixResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const studyHistoryRoute: Routes = [
    {
        path: 'study-history-my-suffix',
        component: StudyHistoryMySuffixComponent,
        resolve: {
            'pagingParams': StudyHistoryMySuffixResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterMonolithicApp.studyHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'study-history-my-suffix/:id',
        component: StudyHistoryMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterMonolithicApp.studyHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const studyHistoryPopupRoute: Routes = [
    {
        path: 'study-history-my-suffix-new',
        component: StudyHistoryMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterMonolithicApp.studyHistory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'study-history-my-suffix/:id/edit',
        component: StudyHistoryMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterMonolithicApp.studyHistory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'study-history-my-suffix/:id/delete',
        component: StudyHistoryMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterMonolithicApp.studyHistory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
