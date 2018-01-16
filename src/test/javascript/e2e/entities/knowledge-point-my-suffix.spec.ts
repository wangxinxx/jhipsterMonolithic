import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
import * as path from 'path';
describe('KnowledgePoint e2e test', () => {

    let navBarPage: NavBarPage;
    let knowledgePointDialogPage: KnowledgePointDialogPage;
    let knowledgePointComponentsPage: KnowledgePointComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load KnowledgePoints', () => {
        navBarPage.goToEntity('knowledge-point-my-suffix');
        knowledgePointComponentsPage = new KnowledgePointComponentsPage();
        expect(knowledgePointComponentsPage.getTitle()).toMatch(/jhipsterMonolithicApp.knowledgePoint.home.title/);

    });

    it('should load create KnowledgePoint dialog', () => {
        knowledgePointComponentsPage.clickOnCreateButton();
        knowledgePointDialogPage = new KnowledgePointDialogPage();
        expect(knowledgePointDialogPage.getModalTitle()).toMatch(/jhipsterMonolithicApp.knowledgePoint.home.createOrEditLabel/);
        knowledgePointDialogPage.close();
    });

    it('should create and save KnowledgePoints', () => {
        knowledgePointComponentsPage.clickOnCreateButton();
        knowledgePointDialogPage.setNameInput('name');
        expect(knowledgePointDialogPage.getNameInput()).toMatch('name');
        knowledgePointDialogPage.setAddTimeInput(12310020012301);
        expect(knowledgePointDialogPage.getAddTimeInput()).toMatch('2001-12-31T02:30');
        knowledgePointDialogPage.setSortInput('5');
        expect(knowledgePointDialogPage.getSortInput()).toMatch('5');
        knowledgePointDialogPage.setPlayCountInput('5');
        expect(knowledgePointDialogPage.getPlayCountInput()).toMatch('5');
        knowledgePointDialogPage.getFreeInput().isSelected().then((selected) => {
            if (selected) {
                knowledgePointDialogPage.getFreeInput().click();
                expect(knowledgePointDialogPage.getFreeInput().isSelected()).toBeFalsy();
            } else {
                knowledgePointDialogPage.getFreeInput().click();
                expect(knowledgePointDialogPage.getFreeInput().isSelected()).toBeTruthy();
            }
        });
        knowledgePointDialogPage.setVideoUrlInput('videoUrl');
        expect(knowledgePointDialogPage.getVideoUrlInput()).toMatch('videoUrl');
        knowledgePointDialogPage.setPlayTimeInput('playTime');
        expect(knowledgePointDialogPage.getPlayTimeInput()).toMatch('playTime');
        knowledgePointDialogPage.typeSelectLastOption();
        knowledgePointDialogPage.setFileTypeInput('fileType');
        expect(knowledgePointDialogPage.getFileTypeInput()).toMatch('fileType');
        knowledgePointDialogPage.setContentInput('content');
        expect(knowledgePointDialogPage.getContentInput()).toMatch('content');
        knowledgePointDialogPage.parentSelectLastOption();
        knowledgePointDialogPage.teacherSelectLastOption();
        knowledgePointDialogPage.courseSelectLastOption();
        knowledgePointDialogPage.save();
        expect(knowledgePointDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class KnowledgePointComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-knowledge-point-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class KnowledgePointDialogPage {
    modalTitle = element(by.css('h4#myKnowledgePointLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    addTimeInput = element(by.css('input#field_addTime'));
    sortInput = element(by.css('input#field_sort'));
    playCountInput = element(by.css('input#field_playCount'));
    freeInput = element(by.css('input#field_free'));
    videoUrlInput = element(by.css('input#field_videoUrl'));
    playTimeInput = element(by.css('input#field_playTime'));
    typeSelect = element(by.css('select#field_type'));
    fileTypeInput = element(by.css('input#field_fileType'));
    contentInput = element(by.css('textarea#field_content'));
    parentSelect = element(by.css('select#field_parent'));
    teacherSelect = element(by.css('select#field_teacher'));
    courseSelect = element(by.css('select#field_course'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    }

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    }

    setAddTimeInput = function(addTime) {
        this.addTimeInput.sendKeys(addTime);
    }

    getAddTimeInput = function() {
        return this.addTimeInput.getAttribute('value');
    }

    setSortInput = function(sort) {
        this.sortInput.sendKeys(sort);
    }

    getSortInput = function() {
        return this.sortInput.getAttribute('value');
    }

    setPlayCountInput = function(playCount) {
        this.playCountInput.sendKeys(playCount);
    }

    getPlayCountInput = function() {
        return this.playCountInput.getAttribute('value');
    }

    getFreeInput = function() {
        return this.freeInput;
    }
    setVideoUrlInput = function(videoUrl) {
        this.videoUrlInput.sendKeys(videoUrl);
    }

    getVideoUrlInput = function() {
        return this.videoUrlInput.getAttribute('value');
    }

    setPlayTimeInput = function(playTime) {
        this.playTimeInput.sendKeys(playTime);
    }

    getPlayTimeInput = function() {
        return this.playTimeInput.getAttribute('value');
    }

    setTypeSelect = function(type) {
        this.typeSelect.sendKeys(type);
    }

    getTypeSelect = function() {
        return this.typeSelect.element(by.css('option:checked')).getText();
    }

    typeSelectLastOption = function() {
        this.typeSelect.all(by.tagName('option')).last().click();
    }
    setFileTypeInput = function(fileType) {
        this.fileTypeInput.sendKeys(fileType);
    }

    getFileTypeInput = function() {
        return this.fileTypeInput.getAttribute('value');
    }

    setContentInput = function(content) {
        this.contentInput.sendKeys(content);
    }

    getContentInput = function() {
        return this.contentInput.getAttribute('value');
    }

    parentSelectLastOption = function() {
        this.parentSelect.all(by.tagName('option')).last().click();
    }

    parentSelectOption = function(option) {
        this.parentSelect.sendKeys(option);
    }

    getParentSelect = function() {
        return this.parentSelect;
    }

    getParentSelectedOption = function() {
        return this.parentSelect.element(by.css('option:checked')).getText();
    }

    teacherSelectLastOption = function() {
        this.teacherSelect.all(by.tagName('option')).last().click();
    }

    teacherSelectOption = function(option) {
        this.teacherSelect.sendKeys(option);
    }

    getTeacherSelect = function() {
        return this.teacherSelect;
    }

    getTeacherSelectedOption = function() {
        return this.teacherSelect.element(by.css('option:checked')).getText();
    }

    courseSelectLastOption = function() {
        this.courseSelect.all(by.tagName('option')).last().click();
    }

    courseSelectOption = function(option) {
        this.courseSelect.sendKeys(option);
    }

    getCourseSelect = function() {
        return this.courseSelect;
    }

    getCourseSelectedOption = function() {
        return this.courseSelect.element(by.css('option:checked')).getText();
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
