import { BaseEntity } from './../../shared';

export const enum SubjectState {
    'ENABLE',
    'DISABLE'
}

export class SubjectMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public status?: SubjectState,
        public createAt?: any,
        public sort?: number,
        public courses?: BaseEntity[],
        public teachers?: BaseEntity[],
        public parentId?: number,
        public children?: BaseEntity[],
    ) {
    }
}
