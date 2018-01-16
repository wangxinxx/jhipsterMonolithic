package com.huibozhixin.jhimonolithic.service.mapper;

import com.huibozhixin.jhimonolithic.domain.*;
import com.huibozhixin.jhimonolithic.service.dto.SubjectDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Subject and its DTO SubjectDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface SubjectMapper extends EntityMapper<SubjectDTO, Subject> {

    @Mapping(source = "parent.id", target = "parentId")
    SubjectDTO toDto(Subject subject); 

    @Mapping(target = "courses", ignore = true)
    @Mapping(target = "teachers", ignore = true)
    @Mapping(source = "parentId", target = "parent")
    @Mapping(target = "children", ignore = true)
    Subject toEntity(SubjectDTO subjectDTO);

    default Subject fromId(Long id) {
        if (id == null) {
            return null;
        }
        Subject subject = new Subject();
        subject.setId(id);
        return subject;
    }
}
