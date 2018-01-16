import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { KnowledgePointMySuffixComponent } from './knowledge-point-my-suffix.component';
import { KnowledgePointMySuffixDetailComponent } from './knowledge-point-my-suffix-detail.component';
import { KnowledgePointMySuffixPopupComponent } from './knowledge-point-my-suffix-dialog.component';
import { KnowledgePointMySuffixDeletePopupComponent } from './knowledge-point-my-suffix-delete-dialog.component';

@Injectable()
export class KnowledgePointMySuffixResolvePagingParams implements Resolve<any> {

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

export const knowledgePointRoute: Routes = [
    {
        path: 'knowledge-point-my-suffix',
        component: KnowledgePointMySuffixComponent,
        resolve: {
            'pagingParams': KnowledgePointMySuffixResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterMonolithicApp.knowledgePoint.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'knowledge-point-my-suffix/:id',
        component: KnowledgePointMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterMonolithicApp.knowledgePoint.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const knowledgePointPopupRoute: Routes = [
    {
        path: 'knowledge-point-my-suffix-new',
        component: KnowledgePointMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterMonolithicApp.knowledgePoint.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'knowledge-point-my-suffix/:id/edit',
        component: KnowledgePointMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterMonolithicApp.knowledgePoint.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'knowledge-point-my-suffix/:id/delete',
        component: KnowledgePointMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterMonolithicApp.knowledgePoint.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
