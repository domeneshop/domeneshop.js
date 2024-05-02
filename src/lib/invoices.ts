import Api from "./api";
import { IInvoice, InvoiceStatus } from "./interfaces/invoice";

class Invoices {
  private api: Api;

  /**
   * Create new Invoice object
   *
   * @param api Instance of Api-class
   */
  constructor(api: Api) {
    this.api = api;
  }

  /**
   * Get all invoices.
   * @param status Optional status of invoices to get.
   *
   * @returns Promise with invoices.
   */
  public async getInvoices(status?: InvoiceStatus): Promise<[IInvoice]> {
    const filter = typeof status !== "undefined" ? `?status=${status}` : "";
    const res = await this.api.apiCall("GET", `/invoices${filter}`);
    return res.data;
  }

  /**
   * Get single invoice
   * @param invoiceID Id of the invoice to get
   *
   * @returns Promise with one invoice.
   */
  public async getInvoice(invoiceID: number): Promise<IInvoice> {
    const res = await this.api.apiCall("GET", `/invoices/${invoiceID}`);
    return res.data;
  }
}

export = Invoices;
