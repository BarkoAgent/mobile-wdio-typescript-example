import AppScreen from './AppScreen';
import LoginScreen from './LoginScreen';

const SELECTORS = {
  SCREEN: '~button-SIGN UP',
  INPUT_EMAIL: '~input-email',
  INPUT_PASSWORD: '~input-password',
  INPUT_REPEAT_PASSWORD: '~input-repeat-password',
  SIGN_UP_BTN: '~button-SIGN UP',
};
class SignUpScreen extends AppScreen {
  constructor() {
    super(SELECTORS.SCREEN);
  }
  private get inputEmail() {
    return $(SELECTORS.INPUT_EMAIL);
  }
  private get inputPassword() {
    return $(SELECTORS.INPUT_PASSWORD);
  }
  private get inputRepeatPassword() {
    return $(SELECTORS.INPUT_REPEAT_PASSWORD);
  }
  private get signUpBtn() {
    return $(SELECTORS.SIGN_UP_BTN);
  }

  async signUp({
    email,
    password,
    repeatPassword = password,
  }: {
    email: string;
    password: string;
    repeatPassword?: string;
  }) {
    await this.inputEmail.setValue(email);
    await this.inputPassword.setValue(password);
    await this.inputRepeatPassword.setValue(repeatPassword);
    await driver.hideKeyboard();
    await this.signUpBtn.click();
  }
  // the sign up success alert is the same native dialog as the login one
  get alertTitle() {
    return LoginScreen.alertTitle;
  }
  get alertMessage() {
    return LoginScreen.alertMessage;
  }
}
export default new SignUpScreen();
