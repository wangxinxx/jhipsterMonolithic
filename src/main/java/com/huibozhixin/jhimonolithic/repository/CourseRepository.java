package com.huibozhixin.jhimonolithic.repository;

import com.huibozhixin.jhimonolithic.domain.Course;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Course entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {

}
