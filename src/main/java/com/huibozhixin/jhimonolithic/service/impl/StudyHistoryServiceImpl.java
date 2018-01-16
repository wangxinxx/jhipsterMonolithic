package com.huibozhixin.jhimonolithic.service.impl;

import com.huibozhixin.jhimonolithic.service.StudyHistoryService;
import com.huibozhixin.jhimonolithic.domain.StudyHistory;
import com.huibozhixin.jhimonolithic.repository.StudyHistoryRepository;
import com.huibozhixin.jhimonolithic.service.dto.StudyHistoryDTO;
import com.huibozhixin.jhimonolithic.service.mapper.StudyHistoryMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing StudyHistory.
 */
@Service
@Transactional
public class StudyHistoryServiceImpl implements StudyHistoryService{

    private final Logger log = LoggerFactory.getLogger(StudyHistoryServiceImpl.class);

    private final StudyHistoryRepository studyHistoryRepository;

    private final StudyHistoryMapper studyHistoryMapper;

    public StudyHistoryServiceImpl(StudyHistoryRepository studyHistoryRepository, StudyHistoryMapper studyHistoryMapper) {
        this.studyHistoryRepository = studyHistoryRepository;
        this.studyHistoryMapper = studyHistoryMapper;
    }

    /**
     * Save a studyHistory.
     *
     * @param studyHistoryDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public StudyHistoryDTO save(StudyHistoryDTO studyHistoryDTO) {
        log.debug("Request to save StudyHistory : {}", studyHistoryDTO);
        StudyHistory studyHistory = studyHistoryMapper.toEntity(studyHistoryDTO);
        studyHistory = studyHistoryRepository.save(studyHistory);
        return studyHistoryMapper.toDto(studyHistory);
    }

    /**
     * Get all the studyHistories.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<StudyHistoryDTO> findAll(Pageable pageable) {
        log.debug("Request to get all StudyHistories");
        return studyHistoryRepository.findAll(pageable)
            .map(studyHistoryMapper::toDto);
    }

    /**
     * Get one studyHistory by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public StudyHistoryDTO findOne(Long id) {
        log.debug("Request to get StudyHistory : {}", id);
        StudyHistory studyHistory = studyHistoryRepository.findOne(id);
        return studyHistoryMapper.toDto(studyHistory);
    }

    /**
     * Delete the studyHistory by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete StudyHistory : {}", id);
        studyHistoryRepository.delete(id);
    }
}
