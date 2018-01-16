package com.huibozhixin.jhimonolithic.service.impl;

import com.huibozhixin.jhimonolithic.service.TeacherService;
import com.huibozhixin.jhimonolithic.domain.Teacher;
import com.huibozhixin.jhimonolithic.repository.TeacherRepository;
import com.huibozhixin.jhimonolithic.service.dto.TeacherDTO;
import com.huibozhixin.jhimonolithic.service.mapper.TeacherMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Teacher.
 */
@Service
@Transactional
public class TeacherServiceImpl implements TeacherService{

    private final Logger log = LoggerFactory.getLogger(TeacherServiceImpl.class);

    private final TeacherRepository teacherRepository;

    private final TeacherMapper teacherMapper;

    public TeacherServiceImpl(TeacherRepository teacherRepository, TeacherMapper teacherMapper) {
        this.teacherRepository = teacherRepository;
        this.teacherMapper = teacherMapper;
    }

    /**
     * Save a teacher.
     *
     * @param teacherDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public TeacherDTO save(TeacherDTO teacherDTO) {
        log.debug("Request to save Teacher : {}", teacherDTO);
        Teacher teacher = teacherMapper.toEntity(teacherDTO);
        teacher = teacherRepository.save(teacher);
        return teacherMapper.toDto(teacher);
    }

    /**
     * Get all the teachers.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<TeacherDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Teachers");
        return teacherRepository.findAll(pageable)
            .map(teacherMapper::toDto);
    }

    /**
     * Get one teacher by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public TeacherDTO findOne(Long id) {
        log.debug("Request to get Teacher : {}", id);
        Teacher teacher = teacherRepository.findOne(id);
        return teacherMapper.toDto(teacher);
    }

    /**
     * Delete the teacher by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Teacher : {}", id);
        teacherRepository.delete(id);
    }
}
