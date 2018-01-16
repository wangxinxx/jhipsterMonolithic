package com.huibozhixin.jhimonolithic.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.huibozhixin.jhimonolithic.domain.enumeration.SubjectState;

/**
 * A Subject.
 */
@Entity
@Table(name = "subject")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Subject implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private SubjectState status;

    @Column(name = "create_at")
    private Instant createAt;

    @Column(name = "jhi_sort")
    private Integer sort;

    @OneToMany(mappedBy = "subject")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Course> courses = new HashSet<>();

    @OneToMany(mappedBy = "subject")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Teacher> teachers = new HashSet<>();

    @ManyToOne
    private Subject parent;

    @OneToMany(mappedBy = "parent")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Subject> children = new HashSet<>();

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

    public Subject name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public SubjectState getStatus() {
        return status;
    }

    public Subject status(SubjectState status) {
        this.status = status;
        return this;
    }

    public void setStatus(SubjectState status) {
        this.status = status;
    }

    public Instant getCreateAt() {
        return createAt;
    }

    public Subject createAt(Instant createAt) {
        this.createAt = createAt;
        return this;
    }

    public void setCreateAt(Instant createAt) {
        this.createAt = createAt;
    }

    public Integer getSort() {
        return sort;
    }

    public Subject sort(Integer sort) {
        this.sort = sort;
        return this;
    }

    public void setSort(Integer sort) {
        this.sort = sort;
    }

    public Set<Course> getCourses() {
        return courses;
    }

    public Subject courses(Set<Course> courses) {
        this.courses = courses;
        return this;
    }

    public Subject addCourses(Course course) {
        this.courses.add(course);
        course.setSubject(this);
        return this;
    }

    public Subject removeCourses(Course course) {
        this.courses.remove(course);
        course.setSubject(null);
        return this;
    }

    public void setCourses(Set<Course> courses) {
        this.courses = courses;
    }

    public Set<Teacher> getTeachers() {
        return teachers;
    }

    public Subject teachers(Set<Teacher> teachers) {
        this.teachers = teachers;
        return this;
    }

    public Subject addTeachers(Teacher teacher) {
        this.teachers.add(teacher);
        teacher.setSubject(this);
        return this;
    }

    public Subject removeTeachers(Teacher teacher) {
        this.teachers.remove(teacher);
        teacher.setSubject(null);
        return this;
    }

    public void setTeachers(Set<Teacher> teachers) {
        this.teachers = teachers;
    }

    public Subject getParent() {
        return parent;
    }

    public Subject parent(Subject subject) {
        this.parent = subject;
        return this;
    }

    public void setParent(Subject subject) {
        this.parent = subject;
    }

    public Set<Subject> getChildren() {
        return children;
    }

    public Subject children(Set<Subject> subjects) {
        this.children = subjects;
        return this;
    }

    public Subject addChildren(Subject subject) {
        this.children.add(subject);
        subject.setParent(this);
        return this;
    }

    public Subject removeChildren(Subject subject) {
        this.children.remove(subject);
        subject.setParent(null);
        return this;
    }

    public void setChildren(Set<Subject> subjects) {
        this.children = subjects;
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
        Subject subject = (Subject) o;
        if (subject.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), subject.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Subject{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", status='" + getStatus() + "'" +
            ", createAt='" + getCreateAt() + "'" +
            ", sort=" + getSort() +
            "}";
    }
}
