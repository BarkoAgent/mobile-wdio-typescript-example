import HomeScreen from '../screenObjects/HomeScreen';
import LoginScreen from '../screenObjects/LoginScreen';
import SignUpScreen from '../screenObjects/SignUpScreen';
import { buildValidUser } from '../data/userFactory';

describe('signup.spec', () => {
  beforeEach(async () => {
    await driver.startActivity(
      process.env.APP_PACKAGE || 'com.wdiodemoapp',
      process.env.APP_ACTIVITY || 'com.wdiodemoapp.MainActivity',
    );

    await HomeScreen.waitForIsShown(true);
    await HomeScreen.openLoginTab();
    await LoginScreen.waitForIsShown(true);
    await LoginScreen.openSignUpTab();
    await SignUpScreen.waitForIsShown(true);
  });
  it('Sign up with valid data', async () => {
    await SignUpScreen.signUp(buildValidUser());
    await expect(SignUpScreen.alertTitle).toHaveText('Signed Up!');
  });
  it('Sign up with mismatching passwords', async () => {
    await SignUpScreen.signUp({ ...buildValidUser(), repeatPassword: 'Different123!' });
    await expect($('//android.widget.TextView[contains(@text,"same")]')).toBeDisplayed();
  });
});
