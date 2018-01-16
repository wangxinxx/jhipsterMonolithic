package com.huibozhixin.jhimonolithic.repository;

import com.huibozhixin.jhimonolithic.domain.Teacher;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Teacher entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TeacherRepository extends JpaRepository<Teacher, Long> {

}
