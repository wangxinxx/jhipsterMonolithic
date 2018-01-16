package com.huibozhixin.jhimonolithic.web.rest;

import com.huibozhixin.jhimonolithic.JhipsterMonolithicApp;

import com.huibozhixin.jhimonolithic.domain.StudyHistory;
import com.huibozhixin.jhimonolithic.repository.StudyHistoryRepository;
import com.huibozhixin.jhimonolithic.service.StudyHistoryService;
import com.huibozhixin.jhimonolithic.service.dto.StudyHistoryDTO;
import com.huibozhixin.jhimonolithic.service.mapper.StudyHistoryMapper;
import com.huibozhixin.jhimonolithic.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static com.huibozhixin.jhimonolithic.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the StudyHistoryResource REST controller.
 *
 * @see StudyHistoryResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterMonolithicApp.class)
public class StudyHistoryResourceIntTest {

    private static final Long DEFAULT_USER_ID = 1L;
    private static final Long UPDATED_USER_ID = 2L;

    private static final String DEFAULT_KPOINT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_KPOINT_NAME = "BBBBBBBBBB";

    private static final Long DEFAULT_PLAYERCOUNT = 1L;
    private static final Long UPDATED_PLAYERCOUNT = 2L;

    private static final String DEFAULT_DATABACK = "AAAAAAAAAA";
    private static final String UPDATED_DATABACK = "BBBBBBBBBB";

    private static final Instant DEFAULT_UPDATE_TIME = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_UPDATE_TIME = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private StudyHistoryRepository studyHistoryRepository;

    @Autowired
    private StudyHistoryMapper studyHistoryMapper;

    @Autowired
    private StudyHistoryService studyHistoryService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restStudyHistoryMockMvc;

    private StudyHistory studyHistory;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final StudyHistoryResource studyHistoryResource = new StudyHistoryResource(studyHistoryService);
        this.restStudyHistoryMockMvc = MockMvcBuilders.standaloneSetup(studyHistoryResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static StudyHistory createEntity(EntityManager em) {
        StudyHistory studyHistory = new StudyHistory()
            .userId(DEFAULT_USER_ID)
            .kpointName(DEFAULT_KPOINT_NAME)
            .playercount(DEFAULT_PLAYERCOUNT)
            .databack(DEFAULT_DATABACK)
            .updateTime(DEFAULT_UPDATE_TIME);
        return studyHistory;
    }

    @Before
    public void initTest() {
        studyHistory = createEntity(em);
    }

    @Test
    @Transactional
    public void createStudyHistory() throws Exception {
        int databaseSizeBeforeCreate = studyHistoryRepository.findAll().size();

        // Create the StudyHistory
        StudyHistoryDTO studyHistoryDTO = studyHistoryMapper.toDto(studyHistory);
        restStudyHistoryMockMvc.perform(post("/api/study-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(studyHistoryDTO)))
            .andExpect(status().isCreated());

        // Validate the StudyHistory in the database
        List<StudyHistory> studyHistoryList = studyHistoryRepository.findAll();
        assertThat(studyHistoryList).hasSize(databaseSizeBeforeCreate + 1);
        StudyHistory testStudyHistory = studyHistoryList.get(studyHistoryList.size() - 1);
        assertThat(testStudyHistory.getUserId()).isEqualTo(DEFAULT_USER_ID);
        assertThat(testStudyHistory.getKpointName()).isEqualTo(DEFAULT_KPOINT_NAME);
        assertThat(testStudyHistory.getPlayercount()).isEqualTo(DEFAULT_PLAYERCOUNT);
        assertThat(testStudyHistory.getDataback()).isEqualTo(DEFAULT_DATABACK);
        assertThat(testStudyHistory.getUpdateTime()).isEqualTo(DEFAULT_UPDATE_TIME);
    }

    @Test
    @Transactional
    public void createStudyHistoryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = studyHistoryRepository.findAll().size();

        // Create the StudyHistory with an existing ID
        studyHistory.setId(1L);
        StudyHistoryDTO studyHistoryDTO = studyHistoryMapper.toDto(studyHistory);

        // An entity with an existing ID cannot be created, so this API call must fail
        restStudyHistoryMockMvc.perform(post("/api/study-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(studyHistoryDTO)))
            .andExpect(status().isBadRequest());

        // Validate the StudyHistory in the database
        List<StudyHistory> studyHistoryList = studyHistoryRepository.findAll();
        assertThat(studyHistoryList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllStudyHistories() throws Exception {
        // Initialize the database
        studyHistoryRepository.saveAndFlush(studyHistory);

        // Get all the studyHistoryList
        restStudyHistoryMockMvc.perform(get("/api/study-histories?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(studyHistory.getId().intValue())))
            .andExpect(jsonPath("$.[*].userId").value(hasItem(DEFAULT_USER_ID.intValue())))
            .andExpect(jsonPath("$.[*].kpointName").value(hasItem(DEFAULT_KPOINT_NAME.toString())))
            .andExpect(jsonPath("$.[*].playercount").value(hasItem(DEFAULT_PLAYERCOUNT.intValue())))
            .andExpect(jsonPath("$.[*].databack").value(hasItem(DEFAULT_DATABACK.toString())))
            .andExpect(jsonPath("$.[*].updateTime").value(hasItem(DEFAULT_UPDATE_TIME.toString())));
    }

    @Test
    @Transactional
    public void getStudyHistory() throws Exception {
        // Initialize the database
        studyHistoryRepository.saveAndFlush(studyHistory);

        // Get the studyHistory
        restStudyHistoryMockMvc.perform(get("/api/study-histories/{id}", studyHistory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(studyHistory.getId().intValue()))
            .andExpect(jsonPath("$.userId").value(DEFAULT_USER_ID.intValue()))
            .andExpect(jsonPath("$.kpointName").value(DEFAULT_KPOINT_NAME.toString()))
            .andExpect(jsonPath("$.playercount").value(DEFAULT_PLAYERCOUNT.intValue()))
            .andExpect(jsonPath("$.databack").value(DEFAULT_DATABACK.toString()))
            .andExpect(jsonPath("$.updateTime").value(DEFAULT_UPDATE_TIME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingStudyHistory() throws Exception {
        // Get the studyHistory
        restStudyHistoryMockMvc.perform(get("/api/study-histories/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateStudyHistory() throws Exception {
        // Initialize the database
        studyHistoryRepository.saveAndFlush(studyHistory);
        int databaseSizeBeforeUpdate = studyHistoryRepository.findAll().size();

        // Update the studyHistory
        StudyHistory updatedStudyHistory = studyHistoryRepository.findOne(studyHistory.getId());
        // Disconnect from session so that the updates on updatedStudyHistory are not directly saved in db
        em.detach(updatedStudyHistory);
        updatedStudyHistory
            .userId(UPDATED_USER_ID)
            .kpointName(UPDATED_KPOINT_NAME)
            .playercount(UPDATED_PLAYERCOUNT)
            .databack(UPDATED_DATABACK)
            .updateTime(UPDATED_UPDATE_TIME);
        StudyHistoryDTO studyHistoryDTO = studyHistoryMapper.toDto(updatedStudyHistory);

        restStudyHistoryMockMvc.perform(put("/api/study-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(studyHistoryDTO)))
            .andExpect(status().isOk());

        // Validate the StudyHistory in the database
        List<StudyHistory> studyHistoryList = studyHistoryRepository.findAll();
        assertThat(studyHistoryList).hasSize(databaseSizeBeforeUpdate);
        StudyHistory testStudyHistory = studyHistoryList.get(studyHistoryList.size() - 1);
        assertThat(testStudyHistory.getUserId()).isEqualTo(UPDATED_USER_ID);
        assertThat(testStudyHistory.getKpointName()).isEqualTo(UPDATED_KPOINT_NAME);
        assertThat(testStudyHistory.getPlayercount()).isEqualTo(UPDATED_PLAYERCOUNT);
        assertThat(testStudyHistory.getDataback()).isEqualTo(UPDATED_DATABACK);
        assertThat(testStudyHistory.getUpdateTime()).isEqualTo(UPDATED_UPDATE_TIME);
    }

    @Test
    @Transactional
    public void updateNonExistingStudyHistory() throws Exception {
        int databaseSizeBeforeUpdate = studyHistoryRepository.findAll().size();

        // Create the StudyHistory
        StudyHistoryDTO studyHistoryDTO = studyHistoryMapper.toDto(studyHistory);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restStudyHistoryMockMvc.perform(put("/api/study-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(studyHistoryDTO)))
            .andExpect(status().isCreated());

        // Validate the StudyHistory in the database
        List<StudyHistory> studyHistoryList = studyHistoryRepository.findAll();
        assertThat(studyHistoryList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteStudyHistory() throws Exception {
        // Initialize the database
        studyHistoryRepository.saveAndFlush(studyHistory);
        int databaseSizeBeforeDelete = studyHistoryRepository.findAll().size();

        // Get the studyHistory
        restStudyHistoryMockMvc.perform(delete("/api/study-histories/{id}", studyHistory.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<StudyHistory> studyHistoryList = studyHistoryRepository.findAll();
        assertThat(studyHistoryList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(StudyHistory.class);
        StudyHistory studyHistory1 = new StudyHistory();
        studyHistory1.setId(1L);
        StudyHistory studyHistory2 = new StudyHistory();
        studyHistory2.setId(studyHistory1.getId());
        assertThat(studyHistory1).isEqualTo(studyHistory2);
        studyHistory2.setId(2L);
        assertThat(studyHistory1).isNotEqualTo(studyHistory2);
        studyHistory1.setId(null);
        assertThat(studyHistory1).isNotEqualTo(studyHistory2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(StudyHistoryDTO.class);
        StudyHistoryDTO studyHistoryDTO1 = new StudyHistoryDTO();
        studyHistoryDTO1.setId(1L);
        StudyHistoryDTO studyHistoryDTO2 = new StudyHistoryDTO();
        assertThat(studyHistoryDTO1).isNotEqualTo(studyHistoryDTO2);
        studyHistoryDTO2.setId(studyHistoryDTO1.getId());
        assertThat(studyHistoryDTO1).isEqualTo(studyHistoryDTO2);
        studyHistoryDTO2.setId(2L);
        assertThat(studyHistoryDTO1).isNotEqualTo(studyHistoryDTO2);
        studyHistoryDTO1.setId(null);
        assertThat(studyHistoryDTO1).isNotEqualTo(studyHistoryDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(studyHistoryMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(studyHistoryMapper.fromId(null)).isNull();
    }
}
