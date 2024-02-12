import logger from '@wdio/logger'
import {Capabilities, Options, Services} from "@wdio/types";

const log = logger('wdio-webmate-service')

export default class WebmateLauncher implements Services.HookFunctions {
    private options: Services.ServiceOption;
    private seleniumEndpoint: URL;
    private apiEndpoint: URL;

    constructor (options: Services.ServiceOption, caps: Capabilities.RemoteCapability, config: Omit<Options.WebdriverIO, 'capabilities'>) {
        this.options = options || {};
        this.seleniumEndpoint = new URL(this.options['seleniumEndpoint'] || 'https://selenium.webmate.io/wd/hub');
        this.apiEndpoint = new URL(this.options['apiEndpoint'] || 'https://app.webmate.io/api/v1');
    }

    fixConfig(config: Omit<Options.WebdriverIO, 'capabilities'>) {
        if (this.options['overrideSeleniumEndpoint'] !== false) {
            config.hostname = this.seleniumEndpoint.hostname;
            const useHttps = this.seleniumEndpoint.protocol && this.seleniumEndpoint.protocol.startsWith('https');
            if (!!this.seleniumEndpoint.port) {
                config.port = parseInt(this.seleniumEndpoint.port);
            } else {
                config.port = useHttps ? 443 : 80;
            }
            config.protocol = useHttps ? 'https': 'http';
            config.path = this.seleniumEndpoint.pathname;
        }
    }

    fixCapabilities(capabilities: Capabilities.RemoteCapabilities | Capabilities.RemoteCapability) {
        // @ts-ignore
        capabilities['wm:email'] = this.options['email'];
        // @ts-ignore
        capabilities['wm:apikey'] = this.options['apikey'];
        // @ts-ignore
        capabilities['wm:project'] = this.options['project'];
        // @ts-ignore
        capabilities['wm:slot'] = this.options['slot'];

        if (this.options['overrideSeleniumEndpoint'] !== false) {
            // @ts-ignore
            capabilities['hostname'] = this.seleniumEndpoint.hostname;
            const useHttps = this.seleniumEndpoint.protocol && this.seleniumEndpoint.protocol.startsWith('https');
            if (!!this.seleniumEndpoint.port) {
                // @ts-ignore
                capabilities['port'] = parseInt(this.seleniumEndpoint.port);
            } else {
                // @ts-ignore
                capabilities['port'] = useHttps ? 443 : 80;
            }
            // @ts-ignore
            capabilities['protocol'] = useHttps ? 'https': 'http';
            // @ts-ignore
            capabilities['path'] = this.seleniumEndpoint.pathname;
        }
    }

    async onPrepare (config: Options.Testrunner, capabilities: Capabilities.RemoteCapabilities) {
        this.fixConfig(config);
        const isMultiremote = !Array.isArray(capabilities)
        if (isMultiremote) {
            for (const browserName of Object.keys(capabilities)) {
                this.fixCapabilities((capabilities as Capabilities.MultiRemoteCapabilities)[browserName].capabilities);
            }
        } else {
            (capabilities as Array<Capabilities.RemoteCapabilities>).forEach(capabilities => this.fixCapabilities(capabilities))
        }
    }

}
