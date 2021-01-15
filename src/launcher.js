import logger from '@wdio/logger'

const log = logger('wdio-webmate-service')

export default class WebmateLauncher {
    constructor (options, capabilities, config) {
        this.options = options || {}
    }

    fixConfig(config) {
        if (this.options['overrideSeleniumEndpoint'] !== false) {
            config['hostname'] = 'selenium.webmate.io'
            config['port'] = 443
            config['protocol'] = 'https'
            config['path'] = '/wd/hub'
        }
    }

    fixCapabilities(capabilities) {
        if (this.options['overrideSeleniumEndpoint'] !== false) {
            capabilities['hostname'] = 'selenium.webmate.io'
            capabilities['port'] = 443
            capabilities['protocol'] = 'https'
            capabilities['path'] = '/wd/hub'
        }
        capabilities['email'] = this.options['email']
        capabilities['apikey'] = this.options['apikey']
        capabilities['project'] = this.options['project']
        capabilities['slot'] = this.options['slot']
    }

    async onPrepare (config, capabilities) {
        this.fixConfig(config)
        if (Array.isArray(capabilities)) {
            for (const capability of capabilities) {
                this.fixCapabilities(capability)
            }
        } else {
            for (const browserName of Object.keys(capabilities)) {
                this.fixCapabilities(capabilities[browserName].capabilities)
            }
        }
    }

}
