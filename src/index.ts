import WebmateLauncher from './launcher'
import WebmateService from './service'
import {WebmateAPISession} from "webmate-sdk-js";

export default WebmateService
export const launcher = WebmateLauncher


declare global {
    namespace WebdriverIO {
        interface Browser {
            webmate: () => WebmateAPISession
        }
        interface MultiRemoteBrowser {
            webmate: () => WebmateAPISession
        }
    }

    namespace WebdriverIOAsync {
        interface Browser {
            webmate: () => WebmateAPISession
        }
        interface MultiRemoteBrowser {
            webmate: () => WebmateAPISession
        }
    }

    namespace WebdriverIOSync {
        interface Browser {
            webmate: () => WebmateAPISession
        }
        interface MultiRemoteBrowser {
            webmate: () => WebmateAPISession
        }
    }
}
