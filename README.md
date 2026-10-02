# mobile-wdio-typescript-example

Training example: mobile test automation with [WebdriverIO](https://webdriver.io/), [Appium](https://appium.io/), Mocha, TypeScript and Allure reports, run on an Android emulator against the public [WebdriverIO native demo app](https://github.com/webdriverio/native-demo-app) (MIT, v2.2.0).

It is a teaching project and may contain defects and rough edges. Finding them is part of the exercise.

## What is covered

| Spec | Scenarios |
|---|---|
| `test/specs/login.spec.ts` | valid login, invalid email, too short password, empty credentials |
| `test/specs/signup.spec.ts` | valid sign up, mismatching passwords |

The demo app has no backend, so test users are generated per run in `test/data/userFactory.ts`.

## Structure

```
test/
  data/          test data factory
  screenObjects/ page (screen) objects
  specs/         Mocha specs
scripts/         download-app.js (fetches the demo APK)
wdio.conf.js     WebdriverIO + Appium configuration
```

## Prerequisites

You need Node.js 18+ (20 or 22 recommended), a JDK 17+ and the Android SDK with one emulator.

### 1. Node.js and dependencies

```bash
npm install
```

### 2. Android SDK and emulator

Easiest route: install [Android Studio](https://developer.android.com/studio), open **Device Manager** and create a Pixel device with a recent system image (API 34 used here). Then make sure `ANDROID_HOME` is set.

Command-line route (macOS, Apple Silicon, with Homebrew):

```bash
brew install --cask android-commandlinetools
export ANDROID_HOME=$HOME/Library/Android/sdk
export ANDROID_SDK_ROOT=$ANDROID_HOME
mkdir -p $ANDROID_HOME
yes | sdkmanager --sdk_root=$ANDROID_HOME --licenses
sdkmanager --sdk_root=$ANDROID_HOME "cmdline-tools;latest" "platform-tools" "emulator" \
  "platforms;android-34" "build-tools;34.0.0" "system-images;android-34;google_apis;arm64-v8a"
export PATH=$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools:$ANDROID_HOME/emulator:$PATH
echo no | avdmanager create avd -n Pixel_7_API_34 -k "system-images;android-34;google_apis;arm64-v8a" -d pixel_7
```

On Intel machines or Linux use the `x86_64` system image instead of `arm64-v8a`. Add the `export` lines to your shell profile to keep them.

Start the emulator and wait until it has booted:

```bash
emulator -avd Pixel_7_API_34 &
adb wait-for-device
adb devices
```

### 3. Demo app

```bash
npm run app:download
```

This downloads the APK into `app/` and verifies its checksum.

### 4. Configuration

```bash
cp .env.example .env
```

Edit `.env` if your emulator differs (`ANDROID_DEVICE_NAME`, `ANDROID_PLATFORM_VERSION`).

The Appium UiAutomator2 driver is installed with `npm install`; no global Appium is needed.

## Running the tests

With the emulator running:

```bash
npm run wdio
```

Run a single spec:

```bash
npm run wdio -- --spec test/specs/login.spec.ts
```

## Reports

An Allure report is generated into `allure-report/` after every run. To open it:

```bash
npm run report
```

To delete local reports:

```bash
npm run delete-local-report
```

## Linting

```bash
npm run eslint
npm run eslint-fix
```

## References

1. WebdriverIO docs - https://webdriver.io/docs/
2. Appium docs - https://appium.io/docs/en/latest/
3. Mocha docs - https://mochajs.org/
4. Native demo app - https://github.com/webdriverio/native-demo-app

## License

MIT, see [LICENSE](LICENSE). The demo app is a separate project, also MIT licensed.
