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
class Invoices {
    /**
     * Create new Invoice object
     *
     * @param api Instance of Api-class
     */
    constructor(api) {
        this.api = api;
    }
    /**
     * Get all invoices.
     * @param status Optional status of invoices to get.
     *
     * @returns Promise with invoices.
     */
    getInvoices(status) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = (typeof status !== "undefined") ? `?status=${status}` : "";
            const res = yield this.api.apiCall("GET", `/invoices${filter}`);
            return res.data;
        });
    }
    /**
     * Get single invoice
     * @param invoiceID Id of the invoice to get
     *
     * @returns Promise with one invoice.
     */
    getInvoice(invoiceID) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.api.apiCall("GET", `/invoices/${invoiceID}`);
            return res.data;
        });
    }
}
module.exports = Invoices;
//# sourceMappingURL=invoices.js.map