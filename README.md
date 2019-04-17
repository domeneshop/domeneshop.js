# domeneshop.js

Javascript library for the Domeneshop API.

## Installation

```
npm install domeneshop.js
```

## Credentials

Use of this module requires Domeneshop API credentials.

You need an API token and secret. See the [Domeneshop API](https://api.domeneshop.no/docs/) documentation for more information (in Norwegian).

**CAUTION:** You should protect these API credentials as you would the password to your Domeneshop user account. Users who can read this information can use these credentials to issue arbitrary API calls on your behalf. 

## Usage example 

```javascript
const Domeneshop = require('domeneshop.js');

const api = new Domeneshop("<api token>","<api secret>");

api.getDomains().then((domains) => {
    for(let domain of domains) {
        api.dns.getRecords(domain.id).then((record) => {
            console.log(domain.domain);
            console.log(record);
        });
    }
}).catch((err)=>{
    console.error(err);
});
```

## domeneshop.js API

### `new Domeneshop(token, secret)`

Creates a new Domeneshop API instance.

### `Domeneshop.getDomain(domainId)`

Get information about one of your domains.

#### Returns:
```json
{
    "domain": "example.com",
    "expiry_date": "2120-01-01",
    "id": 1234567890,
    "nameservers": [ 
        "ns1.hyp.net", 
        "ns2.hyp.net", 
        "ns3.hyp.net" 
    ],
    "registered_date": "1990-01-01",
    "registrant": "ICANN",
    "renew": true,
    "services":
    { 
        "dns": true, 
        "email": false, 
        "registrar": true, 
        "webhotel": "none"
    },
    "status": "active"
}
```

### `Domeneshop.getDomains()`

List all domains on your account.

Returns a list of objects in the same shape as `getDomain(domainId)`.

### `Domeneshop.dns`

This namespace contains all methods to manipulate DNS records for domains.

### `Domeneshop.dns.getRecord(domainId, recordId)`

Get a specific DNS record for a domain.

**Note:**: The host field does not include the domain name. An A record for `www.example.com` should only have `www` in its host field.

#### Returns:
```json
{
    "data": "127.0.0.1",
    "host": "www",
    "id": 1591030,
    "ttl": 3600,
    "type": "A"
}
```

### `Domeneshop.dns.getRecords(domainId)`

List all DNS records for a domain.

### `Domeneshop.dns.createRecord(domainId, record)`

Creates a new DNS record for a domain. The record format is JSON with required parameters like the one returned from **getRecord**.

For full definition see the TypeScript interfaces defined in [src/lib/interfaces/dnsrecord.ts](src/lib/interfaces/dnsrecord.ts)

### `Domeneshop.dns.modifyRecord(domainId, recordId, record)`

Modifies a specific DNS record for a domain.

**Note:** You can't modify the host nor the type field. If you want to modify these fields, delete the existing DNS record and recreate it.

### `Domeneshop.dns.deleteRecord(domainId, recordId)`

Deletes a specific DNS record for a domain.
