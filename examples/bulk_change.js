"use strict";

/**
 * An example of updating all DNS records from one target to another.
 * 
 * Domeneshop AS (c) 2019
 */

const Domeneshop = require('domeneshop.js');
const axios = require('axios');

/**
 * Your information. 
 * See README.md for information about apiToken and apiSecret.
 * Record type is the type of record that should be changed. E.g. "A", "AAAA", "CNAME"
 * From data is what the current content of the record is. E.g. IP address.
 * To data is the new content of the record. E.g. IP address.
 */
const apiToken = "<API token>";
const apiSecret = "<API secret>";
const recordType = "<record type>";
const fromData = "<from data or IP-address>";
const toData = "<to data or IP-address>";

const api = new Domeneshop(apiToken, apiSecret);

async function update() {
    // Get all domains for your account.
    let domains = await api.getDomains();

    // Iterate over the domains.
    for (let domain of domains) {
        // Get all records
        let allRecords = await api.dns.getRecords(domain.id);
        // Get records that matches type and data.
        let records = allRecords.filter(e => {
            return e.data == fromData && e.type == recordType
        });
        // Modify records.
        for (let record of records) {
            console.log("Update " + recordType + "-record from data " + record.data + " to data " + toData);
            // Set new data.
            record.data = toData;
            // Will throw error on a fault.
            await api.dns.modifyRecord(domain.id, record.id, record);
        }
    }
}

update();