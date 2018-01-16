package com.huibozhixin.jhimonolithic.service.dto;


import java.time.Instant;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import com.huibozhixin.jhimonolithic.domain.enumeration.CourseState;
import com.huibozhixin.jhimonolithic.domain.enumeration.SoldOutState;

/**
 * A DTO for the Course entity.
 */
public class CourseDTO implements Serializable {

    private Long id;

    private String name;

    private CourseState state;

    private Instant addAt;

    private BigDecimal originalPrice;

    private BigDecimal price;

    private String intro;

    private String content;

    private Float classHour;

    private String pictureUrl;

    private Instant updateTime;

    private Long salesQuantity;

    private Long pageViews;

    private Instant soldOutTime;

    private SoldOutState soldOutState;

    private Long validDays;

    private Long subjectId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public CourseState getState() {
        return state;
    }

    public void setState(CourseState state) {
        this.state = state;
    }

    public Instant getAddAt() {
        return addAt;
    }

    public void setAddAt(Instant addAt) {
        this.addAt = addAt;
    }

    public BigDecimal getOriginalPrice() {
        return originalPrice;
    }

    public void setOriginalPrice(BigDecimal originalPrice) {
        this.originalPrice = originalPrice;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getIntro() {
        return intro;
    }

    public void setIntro(String intro) {
        this.intro = intro;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Float getClassHour() {
        return classHour;
    }

    public void setClassHour(Float classHour) {
        this.classHour = classHour;
    }

    public String getPictureUrl() {
        return pictureUrl;
    }

    public void setPictureUrl(String pictureUrl) {
        this.pictureUrl = pictureUrl;
    }

    public Instant getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Instant updateTime) {
        this.updateTime = updateTime;
    }

    public Long getSalesQuantity() {
        return salesQuantity;
    }

    public void setSalesQuantity(Long salesQuantity) {
        this.salesQuantity = salesQuantity;
    }

    public Long getPageViews() {
        return pageViews;
    }

    public void setPageViews(Long pageViews) {
        this.pageViews = pageViews;
    }

    public Instant getSoldOutTime() {
        return soldOutTime;
    }

    public void setSoldOutTime(Instant soldOutTime) {
        this.soldOutTime = soldOutTime;
    }

    public SoldOutState getSoldOutState() {
        return soldOutState;
    }

    public void setSoldOutState(SoldOutState soldOutState) {
        this.soldOutState = soldOutState;
    }

    public Long getValidDays() {
        return validDays;
    }

    public void setValidDays(Long validDays) {
        this.validDays = validDays;
    }

    public Long getSubjectId() {
        return subjectId;
    }

    public void setSubjectId(Long subjectId) {
        this.subjectId = subjectId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CourseDTO courseDTO = (CourseDTO) o;
        if(courseDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), courseDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CourseDTO{" +
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
