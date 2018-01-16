package com.huibozhixin.jhimonolithic.repository;

import com.huibozhixin.jhimonolithic.domain.StudyHistory;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the StudyHistory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StudyHistoryRepository extends JpaRepository<StudyHistory, Long> {

}
