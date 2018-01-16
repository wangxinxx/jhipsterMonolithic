package com.huibozhixin.jhimonolithic.repository;

import com.huibozhixin.jhimonolithic.domain.BaseQuestion;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the BaseQuestion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BaseQuestionRepository extends JpaRepository<BaseQuestion, Long> {

}
