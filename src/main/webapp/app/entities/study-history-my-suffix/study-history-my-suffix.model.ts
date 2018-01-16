import { BaseEntity } from './../../shared';

export class StudyHistoryMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public userId?: number,
        public kpointName?: string,
        public playercount?: number,
        public databack?: string,
        public updateTime?: any,
        public courseId?: number,
        public knowledgePointId?: number,
    ) {
    }
}
