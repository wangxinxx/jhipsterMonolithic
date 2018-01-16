package com.huibozhixin.jhimonolithic.repository;

import com.huibozhixin.jhimonolithic.domain.KnowledgePoint;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the KnowledgePoint entity.
 */
@SuppressWarnings("unused")
@Repository
public interface KnowledgePointRepository extends JpaRepository<KnowledgePoint, Long> {

}
