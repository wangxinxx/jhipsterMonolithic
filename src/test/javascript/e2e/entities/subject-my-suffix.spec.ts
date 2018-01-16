import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Subject e2e test', () => {

    let navBarPage: NavBarPage;
    let subjectDialogPage: SubjectDialogPage;
    let subjectComponentsPage: SubjectComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Subjects', () => {
        navBarPage.goToEntity('subject-my-suffix');
        subjectComponentsPage = new SubjectComponentsPage();
        expect(subjectComponentsPage.getTitle()).toMatch(/jhipsterMonolithicApp.subject.home.title/);

    });

    it('should load create Subject dialog', () => {
        subjectComponentsPage.clickOnCreateButton();
        subjectDialogPage = new SubjectDialogPage();
        expect(subjectDialogPage.getModalTitle()).toMatch(/jhipsterMonolithicApp.subject.home.createOrEditLabel/);
        subjectDialogPage.close();
    });

    it('should create and save Subjects', () => {
        subjectComponentsPage.clickOnCreateButton();
        subjectDialogPage.setNameInput('name');
        expect(subjectDialogPage.getNameInput()).toMatch('name');
        subjectDialogPage.statusSelectLastOption();
        subjectDialogPage.setCreateAtInput(12310020012301);
        expect(subjectDialogPage.getCreateAtInput()).toMatch('2001-12-31T02:30');
        subjectDialogPage.setSortInput('5');
        expect(subjectDialogPage.getSortInput()).toMatch('5');
        subjectDialogPage.parentSelectLastOption();
        subjectDialogPage.save();
        expect(subjectDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class SubjectComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-subject-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class SubjectDialogPage {
    modalTitle = element(by.css('h4#mySubjectLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    statusSelect = element(by.css('select#field_status'));
    createAtInput = element(by.css('input#field_createAt'));
    sortInput = element(by.css('input#field_sort'));
    parentSelect = element(by.css('select#field_parent'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    }

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    }

    setStatusSelect = function(status) {
        this.statusSelect.sendKeys(status);
    }

    getStatusSelect = function() {
        return this.statusSelect.element(by.css('option:checked')).getText();
    }

    statusSelectLastOption = function() {
        this.statusSelect.all(by.tagName('option')).last().click();
    }
    setCreateAtInput = function(createAt) {
        this.createAtInput.sendKeys(createAt);
    }

    getCreateAtInput = function() {
        return this.createAtInput.getAttribute('value');
    }

    setSortInput = function(sort) {
        this.sortInput.sendKeys(sort);
    }

    getSortInput = function() {
        return this.sortInput.getAttribute('value');
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
