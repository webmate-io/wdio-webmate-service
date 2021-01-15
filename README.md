WebdriverIO webmate Service
=========================

## Installation

To use the webmate wdio service add `wdio-webmate-service` as a devDependency to your `package.json`.

```json
{
    "devDependencies": {
        "wdio-webmate-service": "^0.1.0"
    }
}
```

## Configuration

When using webmate wdio service the remote will automatically be configured to `https://selenium.webmate.io/wd/hub`. This behaviour is overridden when a `hostname` is specified in the config beforehand. The service itself is configured as such: 

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
            version: '86',
            platform: 'WINDOWS_10_64'
        }]
    }
}
```
