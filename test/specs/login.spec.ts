import HomeScreen from '../screenObjects/HomeScreen';
import LoginScreen from '../screenObjects/LoginScreen';
import { buildValidUser, buildUserWithInvalidEmail, buildUserWithShortPassword } from '../data/userFactory';

describe('login.spec', () => {
  beforeEach(async () => {
    await driver.startActivity(
      process.env.APP_PACKAGE || 'com.wdiodemoapp',
      process.env.APP_ACTIVITY || 'com.wdiodemoapp.MainActivity',
    );

    // Ensure HomeScreen is open before each test
    await HomeScreen.waitForIsShown(true);
    await HomeScreen.openLoginTab();
    await LoginScreen.waitForIsShown(true);
  });
  it('Login with valid credentials', async () => {
    await LoginScreen.login(buildValidUser());
    await expect(LoginScreen.alertTitle).toHaveText('Success');
    await expect(LoginScreen.alertMessage).toHaveText('You are logged in!');
  });
  it('Login with invalid email', async () => {
    await LoginScreen.login(buildUserWithInvalidEmail());
    await expect(LoginScreen.emailError).toBeDisplayed();
  });
  it('Login with too short password', async () => {
    await LoginScreen.login(buildUserWithShortPassword());
    await expect(LoginScreen.passwordError).toBeDisplayed();
  });
  it('Login with empty credentials', async () => {
    await LoginScreen.login({ email: '', password: '' });
    await expect(LoginScreen.emailError).toBeDisplayed();
    await expect(LoginScreen.passwordError).toBeDisplayed();
  });
});
