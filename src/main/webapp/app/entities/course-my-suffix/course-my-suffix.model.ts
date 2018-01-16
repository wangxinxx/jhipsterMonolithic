import { BaseEntity } from './../../shared';

export const enum CourseState {
    'NORMAL',
    'SOLDOUT',
    'DELETE'
}

export const enum SoldOutState {
    'TIMEOUT',
    'DAYOUT'
}

export class CourseMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public state?: CourseState,
        public addAt?: any,
        public originalPrice?: number,
        public price?: number,
        public intro?: string,
        public content?: string,
        public classHour?: number,
        public pictureUrl?: string,
        public updateTime?: any,
        public salesQuantity?: number,
        public pageViews?: number,
        public soldOutTime?: any,
        public soldOutState?: SoldOutState,
        public validDays?: number,
        public knowledgePoints?: BaseEntity[],
        public subjectId?: number,
    ) {
    }
}
