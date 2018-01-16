import { BaseEntity } from './../../shared';

export const enum KnowledgePointType {
    'VIDEO',
    'FILE'
}

export class KnowledgePointMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public addTime?: any,
        public sort?: number,
        public playCount?: number,
        public free?: boolean,
        public videoUrl?: string,
        public playTime?: string,
        public type?: KnowledgePointType,
        public fileType?: string,
        public content?: any,
        public parentId?: number,
        public teacherId?: number,
        public courseId?: number,
        public children?: BaseEntity[],
    ) {
        this.free = false;
    }
}
