"use strict";

/**
 * An example of updating DNS for a host with dynamic IP-addresses.
 * 
 * Domeneshop AS (c) 2019
 */

const Domeneshop = require('domeneshop.js');
const axios = require('axios');

/**
 * Your information. 
 * See README.md for information about apiToken and apiSecret.
 * Domain name is one of your domains.
 * Hostname is a sub domain of the domain in question.
 */
const apiToken = "<API token>";
const apiSecret = "<API secret>";
const domainName = "<domain name>";
const hostName = "<host name>";

const api = new Domeneshop(apiToken, apiSecret);

async function update() {
    // make sure the test domain is available.
    try {
        await axios('http://test.domeneshop.no/info.json');
    } catch(error) {
        throw new Error("Could not connect to test domain. Stopping to prevent erroneous updates.");
    }

    // Get all domains for your account.
    let domains = await api.getDomains();
    // Get the domain in question.
    let domain = domains.filter(d => {
        return d.domain == domainName
    })[0];

    // If we don't the domain.
    if (!domain) {
        throw new Error("Did not find domain " + domainName);
    }

    // Get the current (if they exist) DNS-pointers for the host.
    let records = await api.dns.getRecords(domain.id);

    // Get the current A-record for the host.
    let IPv4 = records.filter(e => {
        return e.host == hostName && e.type == 'A'
    });

    // Get the systems public IPv4 address.
    try {
        var testIPv4 = await axios('http://test.ipv4.domeneshop.no/info.json');
    } catch(error) {
        // We don't care.
    }

    if (testIPv4) {
        // We have an IPv4 address.
        let address = testIPv4.data.ip;
        if (IPv4.length === 0) {
            // If a record doesn't exist, we'll have to create one.
            console.log("Create new A-record to address" + address);
            await api.dns.createRecord(domain.id, {
                type: 'A',
                ttl: 600,
                host: hostName,
                data: address
            });
        } else {
            // Let's change all A-records which points to other hosts.
            for (let record of IPv4) {
                if (record.data !== address) {
                    console.log("Update A-record from address " + record.data + " to address " + address);
                    record.data = address;
                    await api.dns.modifyRecord(domain.id, record.id, record);
                }
            }
        }
    } else {
        // We don't have an IPv4 address. Remove A-record if it exists.
        if (IPv4.length > 0) {
            for (let record of IPv4) {
                console.log("Remove A-record to address " + record.data);
                await api.dns.deleteRecord(domain.id, record.id);
            }
        }
    }

    // Get the current AAAA-record for the host.
    let IPv6 = records.filter(e => {
        return e.host == hostName && e.type == 'AAAA'
    });

    // Get the systems public IPv6 address.
    try {
        var testIPv6 = await axios('http://test.ipv6.domeneshop.no/info.json');
    } catch(error) {
        // We still don't care.
    }
    if (testIPv6) {
        // We have an IPv4 address.
        let address = testIPv6.data.ip;
        if (IPv6.length === 0) {
            // If a record doesn't exist, we'll have to create one.
            console.log("Create new AAAA-record to address" + address);
            await api.dns.createRecord(domain.id, {
                type: 'AAAA',
                ttl: 600,
                host: hostName,
                data: address
            });
        } else {
            // Let's change all AAAA-records which points to other hosts.
            for (let record of IPv6) {
                if (record.data !== address) {
                    console.log("Update AAAA-record from address " + record.data + " to address " + address);
                    record.data = address;
                    await api.dns.modifyRecord(domain.id, record.id, record);
                }
            }
        }
    } else {
        // We don't have an IPv6 address. Remove A-record if it exists.
        if (IPv6.length > 0) {
            console.log("Remove AAAA-record to address " + record.data);
            for (let record of IPv6) {
                await api.dns.deleteRecord(domain.id, record.id);
            }
        }
    }
}

update();