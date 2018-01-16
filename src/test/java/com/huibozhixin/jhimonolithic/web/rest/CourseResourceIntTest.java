package com.huibozhixin.jhimonolithic.web.rest;

import com.huibozhixin.jhimonolithic.JhipsterMonolithicApp;

import com.huibozhixin.jhimonolithic.domain.Course;
import com.huibozhixin.jhimonolithic.repository.CourseRepository;
import com.huibozhixin.jhimonolithic.service.CourseService;
import com.huibozhixin.jhimonolithic.service.dto.CourseDTO;
import com.huibozhixin.jhimonolithic.service.mapper.CourseMapper;
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
import java.math.BigDecimal;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static com.huibozhixin.jhimonolithic.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.huibozhixin.jhimonolithic.domain.enumeration.CourseState;
import com.huibozhixin.jhimonolithic.domain.enumeration.SoldOutState;
/**
 * Test class for the CourseResource REST controller.
 *
 * @see CourseResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterMonolithicApp.class)
public class CourseResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final CourseState DEFAULT_STATE = CourseState.NORMAL;
    private static final CourseState UPDATED_STATE = CourseState.SOLDOUT;

    private static final Instant DEFAULT_ADD_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_ADD_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final BigDecimal DEFAULT_ORIGINAL_PRICE = new BigDecimal(1);
    private static final BigDecimal UPDATED_ORIGINAL_PRICE = new BigDecimal(2);

    private static final BigDecimal DEFAULT_PRICE = new BigDecimal(1);
    private static final BigDecimal UPDATED_PRICE = new BigDecimal(2);

    private static final String DEFAULT_INTRO = "AAAAAAAAAA";
    private static final String UPDATED_INTRO = "BBBBBBBBBB";

    private static final String DEFAULT_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT = "BBBBBBBBBB";

    private static final Float DEFAULT_CLASS_HOUR = 1F;
    private static final Float UPDATED_CLASS_HOUR = 2F;

    private static final String DEFAULT_PICTURE_URL = "AAAAAAAAAA";
    private static final String UPDATED_PICTURE_URL = "BBBBBBBBBB";

    private static final Instant DEFAULT_UPDATE_TIME = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_UPDATE_TIME = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Long DEFAULT_SALES_QUANTITY = 1L;
    private static final Long UPDATED_SALES_QUANTITY = 2L;

    private static final Long DEFAULT_PAGE_VIEWS = 1L;
    private static final Long UPDATED_PAGE_VIEWS = 2L;

    private static final Instant DEFAULT_SOLD_OUT_TIME = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_SOLD_OUT_TIME = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final SoldOutState DEFAULT_SOLD_OUT_STATE = SoldOutState.TIMEOUT;
    private static final SoldOutState UPDATED_SOLD_OUT_STATE = SoldOutState.DAYOUT;

    private static final Long DEFAULT_VALID_DAYS = 1L;
    private static final Long UPDATED_VALID_DAYS = 2L;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private CourseMapper courseMapper;

    @Autowired
    private CourseService courseService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCourseMockMvc;

    private Course course;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CourseResource courseResource = new CourseResource(courseService);
        this.restCourseMockMvc = MockMvcBuilders.standaloneSetup(courseResource)
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
    public static Course createEntity(EntityManager em) {
        Course course = new Course()
            .name(DEFAULT_NAME)
            .state(DEFAULT_STATE)
            .addAt(DEFAULT_ADD_AT)
            .originalPrice(DEFAULT_ORIGINAL_PRICE)
            .price(DEFAULT_PRICE)
            .intro(DEFAULT_INTRO)
            .content(DEFAULT_CONTENT)
            .classHour(DEFAULT_CLASS_HOUR)
            .pictureUrl(DEFAULT_PICTURE_URL)
            .updateTime(DEFAULT_UPDATE_TIME)
            .salesQuantity(DEFAULT_SALES_QUANTITY)
            .pageViews(DEFAULT_PAGE_VIEWS)
            .soldOutTime(DEFAULT_SOLD_OUT_TIME)
            .soldOutState(DEFAULT_SOLD_OUT_STATE)
            .validDays(DEFAULT_VALID_DAYS);
        return course;
    }

    @Before
    public void initTest() {
        course = createEntity(em);
    }

    @Test
    @Transactional
    public void createCourse() throws Exception {
        int databaseSizeBeforeCreate = courseRepository.findAll().size();

        // Create the Course
        CourseDTO courseDTO = courseMapper.toDto(course);
        restCourseMockMvc.perform(post("/api/courses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(courseDTO)))
            .andExpect(status().isCreated());

        // Validate the Course in the database
        List<Course> courseList = courseRepository.findAll();
        assertThat(courseList).hasSize(databaseSizeBeforeCreate + 1);
        Course testCourse = courseList.get(courseList.size() - 1);
        assertThat(testCourse.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testCourse.getState()).isEqualTo(DEFAULT_STATE);
        assertThat(testCourse.getAddAt()).isEqualTo(DEFAULT_ADD_AT);
        assertThat(testCourse.getOriginalPrice()).isEqualTo(DEFAULT_ORIGINAL_PRICE);
        assertThat(testCourse.getPrice()).isEqualTo(DEFAULT_PRICE);
        assertThat(testCourse.getIntro()).isEqualTo(DEFAULT_INTRO);
        assertThat(testCourse.getContent()).isEqualTo(DEFAULT_CONTENT);
        assertThat(testCourse.getClassHour()).isEqualTo(DEFAULT_CLASS_HOUR);
        assertThat(testCourse.getPictureUrl()).isEqualTo(DEFAULT_PICTURE_URL);
        assertThat(testCourse.getUpdateTime()).isEqualTo(DEFAULT_UPDATE_TIME);
        assertThat(testCourse.getSalesQuantity()).isEqualTo(DEFAULT_SALES_QUANTITY);
        assertThat(testCourse.getPageViews()).isEqualTo(DEFAULT_PAGE_VIEWS);
        assertThat(testCourse.getSoldOutTime()).isEqualTo(DEFAULT_SOLD_OUT_TIME);
        assertThat(testCourse.getSoldOutState()).isEqualTo(DEFAULT_SOLD_OUT_STATE);
        assertThat(testCourse.getValidDays()).isEqualTo(DEFAULT_VALID_DAYS);
    }

    @Test
    @Transactional
    public void createCourseWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = courseRepository.findAll().size();

        // Create the Course with an existing ID
        course.setId(1L);
        CourseDTO courseDTO = courseMapper.toDto(course);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCourseMockMvc.perform(post("/api/courses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(courseDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Course in the database
        List<Course> courseList = courseRepository.findAll();
        assertThat(courseList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCourses() throws Exception {
        // Initialize the database
        courseRepository.saveAndFlush(course);

        // Get all the courseList
        restCourseMockMvc.perform(get("/api/courses?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(course.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].state").value(hasItem(DEFAULT_STATE.toString())))
            .andExpect(jsonPath("$.[*].addAt").value(hasItem(DEFAULT_ADD_AT.toString())))
            .andExpect(jsonPath("$.[*].originalPrice").value(hasItem(DEFAULT_ORIGINAL_PRICE.intValue())))
            .andExpect(jsonPath("$.[*].price").value(hasItem(DEFAULT_PRICE.intValue())))
            .andExpect(jsonPath("$.[*].intro").value(hasItem(DEFAULT_INTRO.toString())))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT.toString())))
            .andExpect(jsonPath("$.[*].classHour").value(hasItem(DEFAULT_CLASS_HOUR.doubleValue())))
            .andExpect(jsonPath("$.[*].pictureUrl").value(hasItem(DEFAULT_PICTURE_URL.toString())))
            .andExpect(jsonPath("$.[*].updateTime").value(hasItem(DEFAULT_UPDATE_TIME.toString())))
            .andExpect(jsonPath("$.[*].salesQuantity").value(hasItem(DEFAULT_SALES_QUANTITY.intValue())))
            .andExpect(jsonPath("$.[*].pageViews").value(hasItem(DEFAULT_PAGE_VIEWS.intValue())))
            .andExpect(jsonPath("$.[*].soldOutTime").value(hasItem(DEFAULT_SOLD_OUT_TIME.toString())))
            .andExpect(jsonPath("$.[*].soldOutState").value(hasItem(DEFAULT_SOLD_OUT_STATE.toString())))
            .andExpect(jsonPath("$.[*].validDays").value(hasItem(DEFAULT_VALID_DAYS.intValue())));
    }

    @Test
    @Transactional
    public void getCourse() throws Exception {
        // Initialize the database
        courseRepository.saveAndFlush(course);

        // Get the course
        restCourseMockMvc.perform(get("/api/courses/{id}", course.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(course.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.state").value(DEFAULT_STATE.toString()))
            .andExpect(jsonPath("$.addAt").value(DEFAULT_ADD_AT.toString()))
            .andExpect(jsonPath("$.originalPrice").value(DEFAULT_ORIGINAL_PRICE.intValue()))
            .andExpect(jsonPath("$.price").value(DEFAULT_PRICE.intValue()))
            .andExpect(jsonPath("$.intro").value(DEFAULT_INTRO.toString()))
            .andExpect(jsonPath("$.content").value(DEFAULT_CONTENT.toString()))
            .andExpect(jsonPath("$.classHour").value(DEFAULT_CLASS_HOUR.doubleValue()))
            .andExpect(jsonPath("$.pictureUrl").value(DEFAULT_PICTURE_URL.toString()))
            .andExpect(jsonPath("$.updateTime").value(DEFAULT_UPDATE_TIME.toString()))
            .andExpect(jsonPath("$.salesQuantity").value(DEFAULT_SALES_QUANTITY.intValue()))
            .andExpect(jsonPath("$.pageViews").value(DEFAULT_PAGE_VIEWS.intValue()))
            .andExpect(jsonPath("$.soldOutTime").value(DEFAULT_SOLD_OUT_TIME.toString()))
            .andExpect(jsonPath("$.soldOutState").value(DEFAULT_SOLD_OUT_STATE.toString()))
            .andExpect(jsonPath("$.validDays").value(DEFAULT_VALID_DAYS.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingCourse() throws Exception {
        // Get the course
        restCourseMockMvc.perform(get("/api/courses/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCourse() throws Exception {
        // Initialize the database
        courseRepository.saveAndFlush(course);
        int databaseSizeBeforeUpdate = courseRepository.findAll().size();

        // Update the course
        Course updatedCourse = courseRepository.findOne(course.getId());
        // Disconnect from session so that the updates on updatedCourse are not directly saved in db
        em.detach(updatedCourse);
        updatedCourse
            .name(UPDATED_NAME)
            .state(UPDATED_STATE)
            .addAt(UPDATED_ADD_AT)
            .originalPrice(UPDATED_ORIGINAL_PRICE)
            .price(UPDATED_PRICE)
            .intro(UPDATED_INTRO)
            .content(UPDATED_CONTENT)
            .classHour(UPDATED_CLASS_HOUR)
            .pictureUrl(UPDATED_PICTURE_URL)
            .updateTime(UPDATED_UPDATE_TIME)
            .salesQuantity(UPDATED_SALES_QUANTITY)
            .pageViews(UPDATED_PAGE_VIEWS)
            .soldOutTime(UPDATED_SOLD_OUT_TIME)
            .soldOutState(UPDATED_SOLD_OUT_STATE)
            .validDays(UPDATED_VALID_DAYS);
        CourseDTO courseDTO = courseMapper.toDto(updatedCourse);

        restCourseMockMvc.perform(put("/api/courses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(courseDTO)))
            .andExpect(status().isOk());

        // Validate the Course in the database
        List<Course> courseList = courseRepository.findAll();
        assertThat(courseList).hasSize(databaseSizeBeforeUpdate);
        Course testCourse = courseList.get(courseList.size() - 1);
        assertThat(testCourse.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testCourse.getState()).isEqualTo(UPDATED_STATE);
        assertThat(testCourse.getAddAt()).isEqualTo(UPDATED_ADD_AT);
        assertThat(testCourse.getOriginalPrice()).isEqualTo(UPDATED_ORIGINAL_PRICE);
        assertThat(testCourse.getPrice()).isEqualTo(UPDATED_PRICE);
        assertThat(testCourse.getIntro()).isEqualTo(UPDATED_INTRO);
        assertThat(testCourse.getContent()).isEqualTo(UPDATED_CONTENT);
        assertThat(testCourse.getClassHour()).isEqualTo(UPDATED_CLASS_HOUR);
        assertThat(testCourse.getPictureUrl()).isEqualTo(UPDATED_PICTURE_URL);
        assertThat(testCourse.getUpdateTime()).isEqualTo(UPDATED_UPDATE_TIME);
        assertThat(testCourse.getSalesQuantity()).isEqualTo(UPDATED_SALES_QUANTITY);
        assertThat(testCourse.getPageViews()).isEqualTo(UPDATED_PAGE_VIEWS);
        assertThat(testCourse.getSoldOutTime()).isEqualTo(UPDATED_SOLD_OUT_TIME);
        assertThat(testCourse.getSoldOutState()).isEqualTo(UPDATED_SOLD_OUT_STATE);
        assertThat(testCourse.getValidDays()).isEqualTo(UPDATED_VALID_DAYS);
    }

    @Test
    @Transactional
    public void updateNonExistingCourse() throws Exception {
        int databaseSizeBeforeUpdate = courseRepository.findAll().size();

        // Create the Course
        CourseDTO courseDTO = courseMapper.toDto(course);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCourseMockMvc.perform(put("/api/courses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(courseDTO)))
            .andExpect(status().isCreated());

        // Validate the Course in the database
        List<Course> courseList = courseRepository.findAll();
        assertThat(courseList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCourse() throws Exception {
        // Initialize the database
        courseRepository.saveAndFlush(course);
        int databaseSizeBeforeDelete = courseRepository.findAll().size();

        // Get the course
        restCourseMockMvc.perform(delete("/api/courses/{id}", course.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Course> courseList = courseRepository.findAll();
        assertThat(courseList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Course.class);
        Course course1 = new Course();
        course1.setId(1L);
        Course course2 = new Course();
        course2.setId(course1.getId());
        assertThat(course1).isEqualTo(course2);
        course2.setId(2L);
        assertThat(course1).isNotEqualTo(course2);
        course1.setId(null);
        assertThat(course1).isNotEqualTo(course2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CourseDTO.class);
        CourseDTO courseDTO1 = new CourseDTO();
        courseDTO1.setId(1L);
        CourseDTO courseDTO2 = new CourseDTO();
        assertThat(courseDTO1).isNotEqualTo(courseDTO2);
        courseDTO2.setId(courseDTO1.getId());
        assertThat(courseDTO1).isEqualTo(courseDTO2);
        courseDTO2.setId(2L);
        assertThat(courseDTO1).isNotEqualTo(courseDTO2);
        courseDTO1.setId(null);
        assertThat(courseDTO1).isNotEqualTo(courseDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(courseMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(courseMapper.fromId(null)).isNull();
    }
}
