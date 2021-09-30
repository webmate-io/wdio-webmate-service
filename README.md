WebdriverIO webmate Service
=========================

This service provides convenient access to webmate for WebdriverIO based test setups.

## Installation

To use the webmate wdio service add `wdio-webmate-service` as a devDependency to your `package.json`.

```json
{
    "devDependencies": {
        "wdio-webmate-service": "^1.0.2"
    }
}
```

## Configuration

When using webmate wdio service the remote will automatically be configured to `https://selenium.webmate.io/wd/hub`. This behaviour is disabled when `overrideSeleniumEndpoint` is set to false explicitly in the service options. The service itself is configured as such: 

```js
// wdio.conf.js
exports.config = {
    ...config,
    ...{
        services: [
            ['webmate', {
                email: 'me@example.com',
                apikey: 'f80bd163-04ac-42b3-8400-2a37d0d0b5e9',
                project: 'e579f289-7538-49f5-be5e-d1149cbda31a',
                slot: '1964999b-19b4-4280-a1df-005ee047011e' //Optional
            }]
        ],
        capabilities: [{
            browserName: 'Chrome',
            browserVersion: '93',
            platformName: 'WINDOWS_10_64'
        }]
    }
}
```

## Using the webmate SDK

The wdio-webmate-service is also capable of automatically creating a webmate SDK client if the `webmate-sdk-js` module is found on the module path. The webmate SDK client is then available via `browser.webmate()` which will return a `WebmateApiClient` object (for Reference please consult the webmate SDK Documentation at `https://github.com/webmate-io/webmate-sdk-js`).

If you are using Typescript you can add `wdio-webmate-service` to your types in `tsconfig.json` so that the Typescript compiler may recognize the `browser.webmate()` function.
