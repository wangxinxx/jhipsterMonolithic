package com.huibozhixin.jhimonolithic.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.huibozhixin.jhimonolithic.domain.enumeration.CourseState;

import com.huibozhixin.jhimonolithic.domain.enumeration.SoldOutState;

/**
 * A Course.
 */
@Entity
@Table(name = "course")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Course implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "state")
    private CourseState state;

    @Column(name = "add_at")
    private Instant addAt;

    @Column(name = "original_price", precision=10, scale=2)
    private BigDecimal originalPrice;

    @Column(name = "price", precision=10, scale=2)
    private BigDecimal price;

    @Column(name = "intro")
    private String intro;

    @Column(name = "content")
    private String content;

    @Column(name = "class_hour")
    private Float classHour;

    @Column(name = "picture_url")
    private String pictureUrl;

    @Column(name = "update_time")
    private Instant updateTime;

    @Column(name = "sales_quantity")
    private Long salesQuantity;

    @Column(name = "page_views")
    private Long pageViews;

    @Column(name = "sold_out_time")
    private Instant soldOutTime;

    @Enumerated(EnumType.STRING)
    @Column(name = "sold_out_state")
    private SoldOutState soldOutState;

    @Column(name = "valid_days")
    private Long validDays;

    @OneToMany(mappedBy = "course")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<KnowledgePoint> knowledgePoints = new HashSet<>();

    @ManyToOne
    private Subject subject;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Course name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public CourseState getState() {
        return state;
    }

    public Course state(CourseState state) {
        this.state = state;
        return this;
    }

    public void setState(CourseState state) {
        this.state = state;
    }

    public Instant getAddAt() {
        return addAt;
    }

    public Course addAt(Instant addAt) {
        this.addAt = addAt;
        return this;
    }

    public void setAddAt(Instant addAt) {
        this.addAt = addAt;
    }

    public BigDecimal getOriginalPrice() {
        return originalPrice;
    }

    public Course originalPrice(BigDecimal originalPrice) {
        this.originalPrice = originalPrice;
        return this;
    }

    public void setOriginalPrice(BigDecimal originalPrice) {
        this.originalPrice = originalPrice;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public Course price(BigDecimal price) {
        this.price = price;
        return this;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getIntro() {
        return intro;
    }

    public Course intro(String intro) {
        this.intro = intro;
        return this;
    }

    public void setIntro(String intro) {
        this.intro = intro;
    }

    public String getContent() {
        return content;
    }

    public Course content(String content) {
        this.content = content;
        return this;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Float getClassHour() {
        return classHour;
    }

    public Course classHour(Float classHour) {
        this.classHour = classHour;
        return this;
    }

    public void setClassHour(Float classHour) {
        this.classHour = classHour;
    }

    public String getPictureUrl() {
        return pictureUrl;
    }

    public Course pictureUrl(String pictureUrl) {
        this.pictureUrl = pictureUrl;
        return this;
    }

    public void setPictureUrl(String pictureUrl) {
        this.pictureUrl = pictureUrl;
    }

    public Instant getUpdateTime() {
        return updateTime;
    }

    public Course updateTime(Instant updateTime) {
        this.updateTime = updateTime;
        return this;
    }

    public void setUpdateTime(Instant updateTime) {
        this.updateTime = updateTime;
    }

    public Long getSalesQuantity() {
        return salesQuantity;
    }

    public Course salesQuantity(Long salesQuantity) {
        this.salesQuantity = salesQuantity;
        return this;
    }

    public void setSalesQuantity(Long salesQuantity) {
        this.salesQuantity = salesQuantity;
    }

    public Long getPageViews() {
        return pageViews;
    }

    public Course pageViews(Long pageViews) {
        this.pageViews = pageViews;
        return this;
    }

    public void setPageViews(Long pageViews) {
        this.pageViews = pageViews;
    }

    public Instant getSoldOutTime() {
        return soldOutTime;
    }

    public Course soldOutTime(Instant soldOutTime) {
        this.soldOutTime = soldOutTime;
        return this;
    }

    public void setSoldOutTime(Instant soldOutTime) {
        this.soldOutTime = soldOutTime;
    }

    public SoldOutState getSoldOutState() {
        return soldOutState;
    }

    public Course soldOutState(SoldOutState soldOutState) {
        this.soldOutState = soldOutState;
        return this;
    }

    public void setSoldOutState(SoldOutState soldOutState) {
        this.soldOutState = soldOutState;
    }

    public Long getValidDays() {
        return validDays;
    }

    public Course validDays(Long validDays) {
        this.validDays = validDays;
        return this;
    }

    public void setValidDays(Long validDays) {
        this.validDays = validDays;
    }

    public Set<KnowledgePoint> getKnowledgePoints() {
        return knowledgePoints;
    }

    public Course knowledgePoints(Set<KnowledgePoint> knowledgePoints) {
        this.knowledgePoints = knowledgePoints;
        return this;
    }

    public Course addKnowledgePoints(KnowledgePoint knowledgePoint) {
        this.knowledgePoints.add(knowledgePoint);
        knowledgePoint.setCourse(this);
        return this;
    }

    public Course removeKnowledgePoints(KnowledgePoint knowledgePoint) {
        this.knowledgePoints.remove(knowledgePoint);
        knowledgePoint.setCourse(null);
        return this;
    }

    public void setKnowledgePoints(Set<KnowledgePoint> knowledgePoints) {
        this.knowledgePoints = knowledgePoints;
    }

    public Subject getSubject() {
        return subject;
    }

    public Course subject(Subject subject) {
        this.subject = subject;
        return this;
    }

    public void setSubject(Subject subject) {
        this.subject = subject;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Course course = (Course) o;
        if (course.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), course.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Course{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", state='" + getState() + "'" +
            ", addAt='" + getAddAt() + "'" +
            ", originalPrice=" + getOriginalPrice() +
            ", price=" + getPrice() +
            ", intro='" + getIntro() + "'" +
            ", content='" + getContent() + "'" +
            ", classHour=" + getClassHour() +
            ", pictureUrl='" + getPictureUrl() + "'" +
            ", updateTime='" + getUpdateTime() + "'" +
            ", salesQuantity=" + getSalesQuantity() +
            ", pageViews=" + getPageViews() +
            ", soldOutTime='" + getSoldOutTime() + "'" +
            ", soldOutState='" + getSoldOutState() + "'" +
            ", validDays=" + getValidDays() +
            "}";
    }
}
