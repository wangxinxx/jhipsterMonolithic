package com.huibozhixin.jhimonolithic.service.mapper;

import com.huibozhixin.jhimonolithic.domain.*;
import com.huibozhixin.jhimonolithic.service.dto.CourseDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Course and its DTO CourseDTO.
 */
@Mapper(componentModel = "spring", uses = {SubjectMapper.class})
public interface CourseMapper extends EntityMapper<CourseDTO, Course> {

    @Mapping(source = "subject.id", target = "subjectId")
    CourseDTO toDto(Course course); 

    @Mapping(target = "knowledgePoints", ignore = true)
    @Mapping(source = "subjectId", target = "subject")
    Course toEntity(CourseDTO courseDTO);

    default Course fromId(Long id) {
        if (id == null) {
            return null;
        }
        Course course = new Course();
        course.setId(id);
        return course;
    }
}
