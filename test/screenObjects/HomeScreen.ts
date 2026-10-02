import AppScreen from './AppScreen';

const SELECTORS = {
  SCREEN: '~Home-screen',
  LOGIN_TAB: '~Login',
};
class HomeScreen extends AppScreen {
  constructor() {
    super(SELECTORS.SCREEN);
  }
  /**
   * define elements
   */
  get screen() {
    return $(SELECTORS.SCREEN);
  }
  private get loginTab() {
    return $(SELECTORS.LOGIN_TAB);
  }

  //open the login tab
  async openLoginTab() {
    return await this.loginTab.click();
  }
}
export default new HomeScreen();
