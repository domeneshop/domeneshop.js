"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Forwards {
    /**
     * Create new Forwards object
     *
     * @param api Instance of Api-class
     */
    constructor(api) {
        this.api = api;
    }
    /**
     * Get all forwardings at a domain.
     * @param domainId Domain ID for the domain in question
     *
     * @returns Promise with forwarding data for every hostname.
     */
    getForwards(domainId) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.api.apiCall("GET", `/domains/${domainId}/forwards`);
            return res.data;
        });
    }
    /**
     * Get single forwarding for a host
     * @param domainId Domain ID for the domain in question
     * @param host Hostname for the forwarding in question
     *
     * @returns Promise with forwarding data.
     */
    getForward(domainId, host) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.api.apiCall("GET", `/domains/${domainId}/forwards/${host}`);
            return res.data;
        });
    }
    /**
     * Create forwarding for a host
     * @param domainId Domain ID for the domain in question
     * @param forward The forwarding to be created
     *
     * @returns Promise with hostname
     */
    createForward(domainId, forward) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.api.apiCall("POST", `/domains/${domainId}/forwards`, forward);
            const location = res.headers.location;
            if (location) {
                return location.split("/").slice(-1)[0];
            }
            else {
                throw new Error("This is not happening!!!!");
            }
        });
    }
    /**
     * Modify forwarding for a host
     * @param domainId Domain ID for the domain in question
     * @param host Hostname for the forwarding in question
     * @param forward The new content of the forwarding
     */
    modifyForward(domainId, host, forward) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.api.apiCall("PUT", `/domains/${domainId}/forwards/${host}`, forward);
        });
    }
    /**
     * Delete forwarding for a host
     * @param domainId Domain ID for the domain in question
     * @param host Hostname for the forwarding in question
     */
    deleteForward(domainId, host) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.api.apiCall("DELETE", `/domains/${domainId}/forwards/${host}`);
        });
    }
}
module.exports = Forwards;
//# sourceMappingURL=forwards.js.map