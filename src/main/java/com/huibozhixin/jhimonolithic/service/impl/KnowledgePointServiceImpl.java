package com.huibozhixin.jhimonolithic.service.impl;

import com.huibozhixin.jhimonolithic.service.KnowledgePointService;
import com.huibozhixin.jhimonolithic.domain.KnowledgePoint;
import com.huibozhixin.jhimonolithic.repository.KnowledgePointRepository;
import com.huibozhixin.jhimonolithic.service.dto.KnowledgePointDTO;
import com.huibozhixin.jhimonolithic.service.mapper.KnowledgePointMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing KnowledgePoint.
 */
@Service
@Transactional
public class KnowledgePointServiceImpl implements KnowledgePointService{

    private final Logger log = LoggerFactory.getLogger(KnowledgePointServiceImpl.class);

    private final KnowledgePointRepository knowledgePointRepository;

    private final KnowledgePointMapper knowledgePointMapper;

    public KnowledgePointServiceImpl(KnowledgePointRepository knowledgePointRepository, KnowledgePointMapper knowledgePointMapper) {
        this.knowledgePointRepository = knowledgePointRepository;
        this.knowledgePointMapper = knowledgePointMapper;
    }

    /**
     * Save a knowledgePoint.
     *
     * @param knowledgePointDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public KnowledgePointDTO save(KnowledgePointDTO knowledgePointDTO) {
        log.debug("Request to save KnowledgePoint : {}", knowledgePointDTO);
        KnowledgePoint knowledgePoint = knowledgePointMapper.toEntity(knowledgePointDTO);
        knowledgePoint = knowledgePointRepository.save(knowledgePoint);
        return knowledgePointMapper.toDto(knowledgePoint);
    }

    /**
     * Get all the knowledgePoints.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<KnowledgePointDTO> findAll(Pageable pageable) {
        log.debug("Request to get all KnowledgePoints");
        return knowledgePointRepository.findAll(pageable)
            .map(knowledgePointMapper::toDto);
    }

    /**
     * Get one knowledgePoint by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public KnowledgePointDTO findOne(Long id) {
        log.debug("Request to get KnowledgePoint : {}", id);
        KnowledgePoint knowledgePoint = knowledgePointRepository.findOne(id);
        return knowledgePointMapper.toDto(knowledgePoint);
    }

    /**
     * Delete the knowledgePoint by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete KnowledgePoint : {}", id);
        knowledgePointRepository.delete(id);
    }
}
