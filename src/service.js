import logger from '@wdio/logger'

const log = logger('wdio-webmate-service')

export default class WebmateService {
    constructor (options) {
        this.options = options || {}
    }

}
