import { browser, element, by } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import DepartmentComponentsPage, { DepartmentDeleteDialog } from './department.page-object';
import DepartmentUpdatePage from './department-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../../util/utils';

const expect = chai.expect;

describe('Department e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let departmentComponentsPage: DepartmentComponentsPage;
  let departmentUpdatePage: DepartmentUpdatePage;
  let departmentDeleteDialog: DepartmentDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();

    await signInPage.username.sendKeys('admin');
    await signInPage.password.sendKeys('admin');
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
  });

  it('should load Departments', async () => {
    await navBarPage.getEntityPage('department');
    departmentComponentsPage = new DepartmentComponentsPage();
    expect(await departmentComponentsPage.getTitle().getText()).to.match(/Departments/);
  });

  it('should load create Department page', async () => {
    await departmentComponentsPage.clickOnCreateButton();
    departmentUpdatePage = new DepartmentUpdatePage();
    expect(await departmentUpdatePage.getPageTitle().getAttribute('id')).to.match(/uiApp.organizationDepartment.home.createOrEditLabel/);
    await departmentUpdatePage.cancel();
  });

  it('should create and save Departments', async () => {
    async function createDepartment() {
      await departmentComponentsPage.clickOnCreateButton();
      await departmentUpdatePage.setCodeInput('code');
      expect(await departmentUpdatePage.getCodeInput()).to.match(/code/);
      await departmentUpdatePage.setNameInput('name');
      expect(await departmentUpdatePage.getNameInput()).to.match(/name/);
      await waitUntilDisplayed(departmentUpdatePage.getSaveButton());
      await departmentUpdatePage.save();
      await waitUntilHidden(departmentUpdatePage.getSaveButton());
      expect(await departmentUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createDepartment();
    await departmentComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await departmentComponentsPage.countDeleteButtons();
    await createDepartment();

    await departmentComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await departmentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Department', async () => {
    await departmentComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await departmentComponentsPage.countDeleteButtons();
    await departmentComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    departmentDeleteDialog = new DepartmentDeleteDialog();
    expect(await departmentDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/uiApp.organizationDepartment.delete.question/);
    await departmentDeleteDialog.clickOnConfirmButton();

    await departmentComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await departmentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
