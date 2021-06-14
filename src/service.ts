import logger from '@wdio/logger'
import {HookFunctions, ServiceOption} from "@wdio/types/build/Services";
import {RemoteCapability} from "@wdio/types/build/Capabilities";

const log = logger('wdio-webmate-service')

export default class WebmateService implements HookFunctions {

    private options: ServiceOption;
    private apiEndpoint: string;

    constructor (options: ServiceOption) {
        this.options = options || {}
        this.apiEndpoint = this.options['apiEndpoint'] || 'https://app.webmate.io/api/v1';
    }

    /**
     * this browser object is passed in here for the first time
     */
    before(capabilities: RemoteCapability, specs: string[], browser: any) {
        //Inject webmate api session
        try {
            let webmateSession = require('webmate-sdk-js').startSession(this.options['email'], this.options['apikey'], this.apiEndpoint);
            browser.addCommand('webmate', function() {
                return webmateSession;
            });
        } catch (e) {
            // console.log("Failed to  injected webmate api: " + e);
        }
    }

}
