export default class AppScreen {
  private selector: string;

  constructor(selector: string) {
    this.selector = selector;
  }

  /**
   * Wait for the screen to be visible (or hidden)
   *
   * @param {boolean} isShown
   */
  async waitForIsShown(isShown = true): Promise<boolean | void> {
    return $(this.selector).waitForDisplayed({
      reverse: !isShown,
    });
  }
}
