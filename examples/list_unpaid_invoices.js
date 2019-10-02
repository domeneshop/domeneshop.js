"use strict";

/**
 * An example of listing all unpaid invoices for an account.
 * 
 * Domeneshop AS (c) 2019
 */

const Domeneshop = require('domeneshop.js');

/**
 * Your information. 
 * See README.md for information about apiToken and apiSecret.
 */
const apiToken = "<API token>";
const apiSecret = "<API secret>";

const api = new Domeneshop(apiToken, apiSecret);

async function listUnpaidInvoices() {
    // Get all unpaid invoices.
    let invoices = await api.invoices.getInvoices('unpaid');

    // Check if there is any unpaid invoices.
    if(invoices.length === 0) {
        console.log("No unpaid invoices at the moment");
        return;
    }
    
    // Iterate over the invoices.
    for (let invoice of invoices) {
        // Print invoice information
        console.log("Unpaid invoice " + invoice.id);
        console.log("  Due date: " + invoice.due_date);
        console.log("  Amount:   " + invoice.amount + " " + invoice.currency);
        console.log("  URL:      " + invoice.url);
    }
}

listUnpaidInvoices();