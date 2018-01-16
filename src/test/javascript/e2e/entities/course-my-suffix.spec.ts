import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Course e2e test', () => {

    let navBarPage: NavBarPage;
    let courseDialogPage: CourseDialogPage;
    let courseComponentsPage: CourseComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Courses', () => {
        navBarPage.goToEntity('course-my-suffix');
        courseComponentsPage = new CourseComponentsPage();
        expect(courseComponentsPage.getTitle()).toMatch(/jhipsterMonolithicApp.course.home.title/);

    });

    it('should load create Course dialog', () => {
        courseComponentsPage.clickOnCreateButton();
        courseDialogPage = new CourseDialogPage();
        expect(courseDialogPage.getModalTitle()).toMatch(/jhipsterMonolithicApp.course.home.createOrEditLabel/);
        courseDialogPage.close();
    });

    it('should create and save Courses', () => {
        courseComponentsPage.clickOnCreateButton();
        courseDialogPage.setNameInput('name');
        expect(courseDialogPage.getNameInput()).toMatch('name');
        courseDialogPage.stateSelectLastOption();
        courseDialogPage.setAddAtInput(12310020012301);
        expect(courseDialogPage.getAddAtInput()).toMatch('2001-12-31T02:30');
        courseDialogPage.setOriginalPriceInput('5');
        expect(courseDialogPage.getOriginalPriceInput()).toMatch('5');
        courseDialogPage.setPriceInput('5');
        expect(courseDialogPage.getPriceInput()).toMatch('5');
        courseDialogPage.setIntroInput('intro');
        expect(courseDialogPage.getIntroInput()).toMatch('intro');
        courseDialogPage.setContentInput('content');
        expect(courseDialogPage.getContentInput()).toMatch('content');
        courseDialogPage.setClassHourInput('5');
        expect(courseDialogPage.getClassHourInput()).toMatch('5');
        courseDialogPage.setPictureUrlInput('pictureUrl');
        expect(courseDialogPage.getPictureUrlInput()).toMatch('pictureUrl');
        courseDialogPage.setUpdateTimeInput(12310020012301);
        expect(courseDialogPage.getUpdateTimeInput()).toMatch('2001-12-31T02:30');
        courseDialogPage.setSalesQuantityInput('5');
        expect(courseDialogPage.getSalesQuantityInput()).toMatch('5');
        courseDialogPage.setPageViewsInput('5');
        expect(courseDialogPage.getPageViewsInput()).toMatch('5');
        courseDialogPage.setSoldOutTimeInput(12310020012301);
        expect(courseDialogPage.getSoldOutTimeInput()).toMatch('2001-12-31T02:30');
        courseDialogPage.soldOutStateSelectLastOption();
        courseDialogPage.setValidDaysInput('5');
        expect(courseDialogPage.getValidDaysInput()).toMatch('5');
        courseDialogPage.subjectSelectLastOption();
        courseDialogPage.save();
        expect(courseDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class CourseComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-course-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CourseDialogPage {
    modalTitle = element(by.css('h4#myCourseLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    stateSelect = element(by.css('select#field_state'));
    addAtInput = element(by.css('input#field_addAt'));
    originalPriceInput = element(by.css('input#field_originalPrice'));
    priceInput = element(by.css('input#field_price'));
    introInput = element(by.css('input#field_intro'));
    contentInput = element(by.css('input#field_content'));
    classHourInput = element(by.css('input#field_classHour'));
    pictureUrlInput = element(by.css('input#field_pictureUrl'));
    updateTimeInput = element(by.css('input#field_updateTime'));
    salesQuantityInput = element(by.css('input#field_salesQuantity'));
    pageViewsInput = element(by.css('input#field_pageViews'));
    soldOutTimeInput = element(by.css('input#field_soldOutTime'));
    soldOutStateSelect = element(by.css('select#field_soldOutState'));
    validDaysInput = element(by.css('input#field_validDays'));
    subjectSelect = element(by.css('select#field_subject'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    }

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    }

    setStateSelect = function(state) {
        this.stateSelect.sendKeys(state);
    }

    getStateSelect = function() {
        return this.stateSelect.element(by.css('option:checked')).getText();
    }

    stateSelectLastOption = function() {
        this.stateSelect.all(by.tagName('option')).last().click();
    }
    setAddAtInput = function(addAt) {
        this.addAtInput.sendKeys(addAt);
    }

    getAddAtInput = function() {
        return this.addAtInput.getAttribute('value');
    }

    setOriginalPriceInput = function(originalPrice) {
        this.originalPriceInput.sendKeys(originalPrice);
    }

    getOriginalPriceInput = function() {
        return this.originalPriceInput.getAttribute('value');
    }

    setPriceInput = function(price) {
        this.priceInput.sendKeys(price);
    }

    getPriceInput = function() {
        return this.priceInput.getAttribute('value');
    }

    setIntroInput = function(intro) {
        this.introInput.sendKeys(intro);
    }

    getIntroInput = function() {
        return this.introInput.getAttribute('value');
    }

    setContentInput = function(content) {
        this.contentInput.sendKeys(content);
    }

    getContentInput = function() {
        return this.contentInput.getAttribute('value');
    }

    setClassHourInput = function(classHour) {
        this.classHourInput.sendKeys(classHour);
    }

    getClassHourInput = function() {
        return this.classHourInput.getAttribute('value');
    }

    setPictureUrlInput = function(pictureUrl) {
        this.pictureUrlInput.sendKeys(pictureUrl);
    }

    getPictureUrlInput = function() {
        return this.pictureUrlInput.getAttribute('value');
    }

    setUpdateTimeInput = function(updateTime) {
        this.updateTimeInput.sendKeys(updateTime);
    }

    getUpdateTimeInput = function() {
        return this.updateTimeInput.getAttribute('value');
    }

    setSalesQuantityInput = function(salesQuantity) {
        this.salesQuantityInput.sendKeys(salesQuantity);
    }

    getSalesQuantityInput = function() {
        return this.salesQuantityInput.getAttribute('value');
    }

    setPageViewsInput = function(pageViews) {
        this.pageViewsInput.sendKeys(pageViews);
    }

    getPageViewsInput = function() {
        return this.pageViewsInput.getAttribute('value');
    }

    setSoldOutTimeInput = function(soldOutTime) {
        this.soldOutTimeInput.sendKeys(soldOutTime);
    }

    getSoldOutTimeInput = function() {
        return this.soldOutTimeInput.getAttribute('value');
    }

    setSoldOutStateSelect = function(soldOutState) {
        this.soldOutStateSelect.sendKeys(soldOutState);
    }

    getSoldOutStateSelect = function() {
        return this.soldOutStateSelect.element(by.css('option:checked')).getText();
    }

    soldOutStateSelectLastOption = function() {
        this.soldOutStateSelect.all(by.tagName('option')).last().click();
    }
    setValidDaysInput = function(validDays) {
        this.validDaysInput.sendKeys(validDays);
    }

    getValidDaysInput = function() {
        return this.validDaysInput.getAttribute('value');
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
