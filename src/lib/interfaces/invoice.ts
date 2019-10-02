/**
 * invoice data
 */
export interface IInvoice {
    amount: number;
    currency: string;
    due_date: string;
    issued_date: string;
    paid_date: string;
    id: number;
    status: InvoiceStatus;
    type: string;
    url: string;
}

export type InvoiceStatus = "paid" | "unpaid" | "settled";
