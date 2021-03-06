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
const dnsrecord_1 = require("./interfaces/dnsrecord");
class Dns {
    /**
     * Create new DNS object
     *
     * @param api Instance of Api-class
     */
    constructor(api) {
        this.api = api;
    }
    /**
     * Get all DNS records for a domain.
     * @param domainId Domain ID for the domain in question
     *
     * @returns Promise with all DNS records on a domain
     */
    getRecords(domainId) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.api.apiCall("GET", `/domains/${domainId}/dns`);
            return res.data;
        });
    }
    /**
     * Get single record
     * @param domainId Domain ID for the domain in question
     * @param recordId Record ID for the record in question
     *
     * @returns Promise with one specific DNS record on a domain
     */
    getRecord(domainId, recordId) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.api.apiCall("GET", `/domains/${domainId}/dns/${recordId}`);
            return res.data;
        });
    }
    /**
     * Create one record
     * @param domainId Domain ID for the domain in question
     * @param record The record to be created
     *
     * @returns Promise with the ID of the created DNS record
     */
    createRecord(domainId, record) {
        return __awaiter(this, void 0, void 0, function* () {
            dnsrecord_1.validate(record);
            const res = yield this.api.apiCall("POST", `/domains/${domainId}/dns`, record);
            const location = res.headers.location;
            if (location) {
                return parseInt(location.split("/").slice(-1)[0], 10);
            }
            else {
                throw new Error("This is not happening!!!!");
            }
        });
    }
    /**
     * Modify one record
     * @param domainId Domain ID for the domain in question
     * @param recordId Record ID for the record in question
     * @param record The new content of the record
     */
    modifyRecord(domainId, recordId, record) {
        return __awaiter(this, void 0, void 0, function* () {
            dnsrecord_1.validate(record);
            yield this.api.apiCall("PUT", `/domains/${domainId}/dns/${recordId}`, record);
        });
    }
    /**
     * Delete one record
     * @param domainId Domain ID for the domain in question
     * @param recordId Record ID for the record in question
     */
    deleteRecord(domainId, recordId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.api.apiCall("DELETE", `/domains/${domainId}/dns/${recordId}`);
        });
    }
}
module.exports = Dns;
//# sourceMappingURL=dns.js.map