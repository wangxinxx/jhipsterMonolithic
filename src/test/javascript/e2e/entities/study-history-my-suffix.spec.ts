import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('StudyHistory e2e test', () => {

    let navBarPage: NavBarPage;
    let studyHistoryDialogPage: StudyHistoryDialogPage;
    let studyHistoryComponentsPage: StudyHistoryComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load StudyHistories', () => {
        navBarPage.goToEntity('study-history-my-suffix');
        studyHistoryComponentsPage = new StudyHistoryComponentsPage();
        expect(studyHistoryComponentsPage.getTitle()).toMatch(/jhipsterMonolithicApp.studyHistory.home.title/);

    });

    it('should load create StudyHistory dialog', () => {
        studyHistoryComponentsPage.clickOnCreateButton();
        studyHistoryDialogPage = new StudyHistoryDialogPage();
        expect(studyHistoryDialogPage.getModalTitle()).toMatch(/jhipsterMonolithicApp.studyHistory.home.createOrEditLabel/);
        studyHistoryDialogPage.close();
    });

    it('should create and save StudyHistories', () => {
        studyHistoryComponentsPage.clickOnCreateButton();
        studyHistoryDialogPage.setUserIdInput('5');
        expect(studyHistoryDialogPage.getUserIdInput()).toMatch('5');
        studyHistoryDialogPage.setKpointNameInput('kpointName');
        expect(studyHistoryDialogPage.getKpointNameInput()).toMatch('kpointName');
        studyHistoryDialogPage.setPlayercountInput('5');
        expect(studyHistoryDialogPage.getPlayercountInput()).toMatch('5');
        studyHistoryDialogPage.setDatabackInput('databack');
        expect(studyHistoryDialogPage.getDatabackInput()).toMatch('databack');
        studyHistoryDialogPage.setUpdateTimeInput(12310020012301);
        expect(studyHistoryDialogPage.getUpdateTimeInput()).toMatch('2001-12-31T02:30');
        studyHistoryDialogPage.courseSelectLastOption();
        studyHistoryDialogPage.knowledgePointSelectLastOption();
        studyHistoryDialogPage.save();
        expect(studyHistoryDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class StudyHistoryComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-study-history-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class StudyHistoryDialogPage {
    modalTitle = element(by.css('h4#myStudyHistoryLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    userIdInput = element(by.css('input#field_userId'));
    kpointNameInput = element(by.css('input#field_kpointName'));
    playercountInput = element(by.css('input#field_playercount'));
    databackInput = element(by.css('input#field_databack'));
    updateTimeInput = element(by.css('input#field_updateTime'));
    courseSelect = element(by.css('select#field_course'));
    knowledgePointSelect = element(by.css('select#field_knowledgePoint'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setUserIdInput = function(userId) {
        this.userIdInput.sendKeys(userId);
    }

    getUserIdInput = function() {
        return this.userIdInput.getAttribute('value');
    }

    setKpointNameInput = function(kpointName) {
        this.kpointNameInput.sendKeys(kpointName);
    }

    getKpointNameInput = function() {
        return this.kpointNameInput.getAttribute('value');
    }

    setPlayercountInput = function(playercount) {
        this.playercountInput.sendKeys(playercount);
    }

    getPlayercountInput = function() {
        return this.playercountInput.getAttribute('value');
    }

    setDatabackInput = function(databack) {
        this.databackInput.sendKeys(databack);
    }

    getDatabackInput = function() {
        return this.databackInput.getAttribute('value');
    }

    setUpdateTimeInput = function(updateTime) {
        this.updateTimeInput.sendKeys(updateTime);
    }

    getUpdateTimeInput = function() {
        return this.updateTimeInput.getAttribute('value');
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

    knowledgePointSelectLastOption = function() {
        this.knowledgePointSelect.all(by.tagName('option')).last().click();
    }

    knowledgePointSelectOption = function(option) {
        this.knowledgePointSelect.sendKeys(option);
    }

    getKnowledgePointSelect = function() {
        return this.knowledgePointSelect;
    }

    getKnowledgePointSelectedOption = function() {
        return this.knowledgePointSelect.element(by.css('option:checked')).getText();
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
