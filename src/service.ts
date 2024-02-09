import logger from '@wdio/logger'
import {Capabilities, Services} from "@wdio/types";

const log = logger('wdio-webmate-service')

export default class WebmateService implements Services.HookFunctions {

    private options: Services.ServiceOption;
    private apiEndpoint: string;

    constructor (options: Services.ServiceOption) {
        this.options = options || {}
        this.apiEndpoint = this.options['apiEndpoint'] || 'https://app.webmate.io/api/v1';
    }

    /**
     * this browser object is passed in here for the first time
     */
    before(capabilities: Capabilities.RemoteCapability, specs: string[], browser: any) {
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
