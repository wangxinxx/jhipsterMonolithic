import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Teacher e2e test', () => {

    let navBarPage: NavBarPage;
    let teacherDialogPage: TeacherDialogPage;
    let teacherComponentsPage: TeacherComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Teachers', () => {
        navBarPage.goToEntity('teacher-my-suffix');
        teacherComponentsPage = new TeacherComponentsPage();
        expect(teacherComponentsPage.getTitle()).toMatch(/jhipsterMonolithicApp.teacher.home.title/);

    });

    it('should load create Teacher dialog', () => {
        teacherComponentsPage.clickOnCreateButton();
        teacherDialogPage = new TeacherDialogPage();
        expect(teacherDialogPage.getModalTitle()).toMatch(/jhipsterMonolithicApp.teacher.home.createOrEditLabel/);
        teacherDialogPage.close();
    });

    it('should create and save Teachers', () => {
        teacherComponentsPage.clickOnCreateButton();
        teacherDialogPage.setUserIdInput('5');
        expect(teacherDialogPage.getUserIdInput()).toMatch('5');
        teacherDialogPage.setNameInput('name');
        expect(teacherDialogPage.getNameInput()).toMatch('name');
        teacherDialogPage.setEducationInput('education');
        expect(teacherDialogPage.getEducationInput()).toMatch('education');
        teacherDialogPage.setCareerInput('career');
        expect(teacherDialogPage.getCareerInput()).toMatch('career');
        teacherDialogPage.setStarInput('5');
        expect(teacherDialogPage.getStarInput()).toMatch('5');
        teacherDialogPage.setPicPathInput('picPath');
        expect(teacherDialogPage.getPicPathInput()).toMatch('picPath');
        teacherDialogPage.getDeletedInput().isSelected().then((selected) => {
            if (selected) {
                teacherDialogPage.getDeletedInput().click();
                expect(teacherDialogPage.getDeletedInput().isSelected()).toBeFalsy();
            } else {
                teacherDialogPage.getDeletedInput().click();
                expect(teacherDialogPage.getDeletedInput().isSelected()).toBeTruthy();
            }
        });
        teacherDialogPage.setCreateTimeInput(12310020012301);
        expect(teacherDialogPage.getCreateTimeInput()).toMatch('2001-12-31T02:30');
        teacherDialogPage.setUpdateTimeInput(12310020012301);
        expect(teacherDialogPage.getUpdateTimeInput()).toMatch('2001-12-31T02:30');
        teacherDialogPage.setSortInput('5');
        expect(teacherDialogPage.getSortInput()).toMatch('5');
        teacherDialogPage.subjectSelectLastOption();
        teacherDialogPage.save();
        expect(teacherDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class TeacherComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-teacher-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class TeacherDialogPage {
    modalTitle = element(by.css('h4#myTeacherLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    userIdInput = element(by.css('input#field_userId'));
    nameInput = element(by.css('input#field_name'));
    educationInput = element(by.css('input#field_education'));
    careerInput = element(by.css('input#field_career'));
    starInput = element(by.css('input#field_star'));
    picPathInput = element(by.css('input#field_picPath'));
    deletedInput = element(by.css('input#field_deleted'));
    createTimeInput = element(by.css('input#field_createTime'));
    updateTimeInput = element(by.css('input#field_updateTime'));
    sortInput = element(by.css('input#field_sort'));
    subjectSelect = element(by.css('select#field_subject'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setUserIdInput = function(userId) {
        this.userIdInput.sendKeys(userId);
    }

    getUserIdInput = function() {
        return this.userIdInput.getAttribute('value');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    }

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    }

    setEducationInput = function(education) {
        this.educationInput.sendKeys(education);
    }

    getEducationInput = function() {
        return this.educationInput.getAttribute('value');
    }

    setCareerInput = function(career) {
        this.careerInput.sendKeys(career);
    }

    getCareerInput = function() {
        return this.careerInput.getAttribute('value');
    }

    setStarInput = function(star) {
        this.starInput.sendKeys(star);
    }

    getStarInput = function() {
        return this.starInput.getAttribute('value');
    }

    setPicPathInput = function(picPath) {
        this.picPathInput.sendKeys(picPath);
    }

    getPicPathInput = function() {
        return this.picPathInput.getAttribute('value');
    }

    getDeletedInput = function() {
        return this.deletedInput;
    }
    setCreateTimeInput = function(createTime) {
        this.createTimeInput.sendKeys(createTime);
    }

    getCreateTimeInput = function() {
        return this.createTimeInput.getAttribute('value');
    }

    setUpdateTimeInput = function(updateTime) {
        this.updateTimeInput.sendKeys(updateTime);
    }

    getUpdateTimeInput = function() {
        return this.updateTimeInput.getAttribute('value');
    }

    setSortInput = function(sort) {
        this.sortInput.sendKeys(sort);
    }

    getSortInput = function() {
        return this.sortInput.getAttribute('value');
    }

    subjectSelectLastOption = function() {
        this.subjectSelect.all(by.tagName('option')).last().click();
    }

    subjectSelectOption = function(option) {
        this.subjectSelect.sendKeys(option);
    }

    getSubjectSelect = function() {
        return this.subjectSelect;
    }

    getSubjectSelectedOption = function() {
        return this.subjectSelect.element(by.css('option:checked')).getText();
    }

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
