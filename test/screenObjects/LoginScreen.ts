import AppScreen from './AppScreen';

const SELECTORS = {
  SCREEN: '~Login-screen',
  LOGIN_TAB: '~button-login-container',
  SIGN_UP_TAB: '~button-sign-up-container',
  INPUT_EMAIL: '~input-email',
  INPUT_PASSWORD: '~input-password',
  LOGIN_BTN: '~button-LOGIN',
  EMAIL_ERROR: '//android.widget.TextView[@text="Please enter a valid email address"]',
  PASSWORD_ERROR: '//android.widget.TextView[@text="Please enter at least 8 characters"]',
  ALERT_TITLE: 'id=com.wdiodemoapp:id/alert_title',
  ALERT_MESSAGE: 'id=android:id/message',
  ALERT_OK_BTN: 'id=android:id/button1',
};
class LoginScreen extends AppScreen {
  constructor() {
    super(SELECTORS.SCREEN);
  }
  /**
   * define elements
   */
  get screen() {
    return $(SELECTORS.SCREEN);
  }
  private get inputEmail() {
    return $(SELECTORS.INPUT_EMAIL);
  }
  private get inputPassword() {
    return $(SELECTORS.INPUT_PASSWORD);
  }
  private get loginBtn() {
    return $(SELECTORS.LOGIN_BTN);
  }
  get emailError() {
    return $(SELECTORS.EMAIL_ERROR);
  }
  get passwordError() {
    return $(SELECTORS.PASSWORD_ERROR);
  }
  get alertTitle() {
    return $(SELECTORS.ALERT_TITLE);
  }
  get alertMessage() {
    return $(SELECTORS.ALERT_MESSAGE);
  }
  private get alertOkBtn() {
    return $(SELECTORS.ALERT_OK_BTN);
  }

  async login({ email, password }: { email: string; password: string }) {
    await this.inputEmail.setValue(email);
    await this.inputPassword.setValue(password);
    await driver.hideKeyboard();
    await this.loginBtn.click();
  }
  async closeAlert() {
    return await this.alertOkBtn.click();
  }
  async openSignUpTab() {
    return await $(SELECTORS.SIGN_UP_TAB).click();
  }
  async openLoginTab() {
    return await $(SELECTORS.LOGIN_TAB).click();
  }
}
export default new LoginScreen();
