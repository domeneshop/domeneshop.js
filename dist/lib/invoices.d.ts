import Api from "./api";
import { IInvoice, InvoiceStatus } from "./interfaces/invoice";
declare class Invoices {
    private api;
    /**
     * Create new Invoice object
     *
     * @param api Instance of Api-class
     */
    constructor(api: Api);
    /**
     * Get all invoices.
     * @param status Optional status of invoices to get.
     *
     * @returns Promise with invoices.
     */
    getInvoices(status?: InvoiceStatus): Promise<[IInvoice]>;
    /**
     * Get single invoice
     * @param invoiceID Id of the invoice to get
     *
     * @returns Promise with one invoice.
     */
    getInvoice(invoiceID: number): Promise<IInvoice>;
}
export = Invoices;
