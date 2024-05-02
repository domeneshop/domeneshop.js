"use strict";

/**
 * An example of updating DNS if primary server is unavailable.
 *
 * Domeneshop AS (c) 2019
 */

const Domeneshop = require("domeneshop.js");
const axios = require("axios");

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

// IPv4 address for the primary server
const primaryServerIP = "127.0.0.1";
// IPv4 address for the secondary server
const secondaryServerIP = "127.0.0.2";

// Number of failed tests before change is required.
const nrOfFaults = 3;
// How often to test (in seconds).
const checkInterval = 60;

// Counters for faults detected on primary and secondary server.
var primaryFaultsDetected = 0;
var secondaryFaultsDetected = 0;

const api = new Domeneshop(apiToken, apiSecret);

// Test function
async function testServer(ip) {
  // test if server is available
  // This is an simple example to test the server
  try {
    await axios("http://" + ip + "/");
    return true;
  } catch (error) {
    return false;
  }
}

// Main function
async function check() {
  // Test primary server
  if (await testServer(primaryServerIP)) {
    // It is available decrease fault count if necessary
    if (primaryFaultsDetected > 0) primaryFaultsDetected--;
  } else {
    // It is unavailable increase fault count if necessary
    if (primaryFaultsDetected <= nrOfFaults) primaryFaultsDetected++;
  }

  // Test secondary server
  if (await testServer(secondaryServerIP)) {
    // It is available decrease fault count if necessary
    if (secondaryFaultsDetected > 0) secondaryFaultsDetected--;
  } else {
    // It is unavailable increase fault count if necessary
    if (secondaryFaultsDetected <= nrOfFaults) secondaryFaultsDetected++;
  }

  let changeDone = false;
  // make sure DNS-pointer is set to secondary IP if primary is unavailable an secondary is.
  if (primaryFaultsDetected > nrOfFaults && secondaryFaultsDetected == 0) {
    changeDone = await shouldBe(secondaryServerIP);
  } else if (primaryFaultsDetected == 0) {
    // if primary is available use it.
    changeDone = await shouldBe(primaryServerIP);
  }
  if (changeDone) {
    // The place to add some alert code.
    console.log("Change done!");
  }
}

async function shouldBe(ip) {
  // Get all domains for your account.
  let domains = await api.getDomains();
  // Get the domain in question.
  let domain = domains.filter((d) => {
    return d.domain == domainName;
  })[0];

  // If we don't the domain.
  if (!domain) {
    throw new Error("Did not find domain " + domainName);
  }

  // Get the current (if they exist) DNS-pointers for the host.
  let records = await api.dns.getRecords(domain.id);

  // Get the current A-record for the host.
  let IPv4 = records.filter((e) => {
    return e.host == hostName && e.type == "A";
  });

  if (IPv4.length === 0) {
    // If a record doesn't exist, we'll have to create one.
    console.log("Create new A-record to address " + ip);
    await api.dns.createRecord(domain.id, {
      type: "A",
      ttl: 600,
      host: hostName,
      data: ip,
    });
    return true;
  } else {
    // Let's change all A-records which points to other hosts.
    let changeDone = false;
    for (let record of IPv4) {
      if (record.data !== ip) {
        console.log(
          "Update A-record from address " + record.data + " to address " + ip
        );
        record.data = ip;
        await api.dns.modifyRecord(domain.id, record.id, record);
        changeDone = true;
      }
    }
    return changeDone;
  }
}

setInterval(check, checkInterval * 1000);
