"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Performs a simple validation a DNS-record.
 * @param params Json object which describes a DNS-record.
 */
function validate(params) {
    const common = ['host', 'data', 'type'];
    const types = {
        'A': [],
        'AAAA': [],
        'CNAME': [],
        'ANAME': [],
        'MX': ['priority'],
        'SRV': ['priority', 'weight', 'port'],
        'TLSA': ['usage', 'selector', 'dtype'],
        'DS': ['tag', 'alg', 'digest'],
        'CAA': ['flags', 'tag']
    };
    if (!params.hasOwnProperty("type"))
        throw new Error("Record does not have any type");
    if (!types.hasOwnProperty(params.type))
        throw new Error("Record has an unknown type");
    let fields = common;
    let special = types[params.type];
    fields.concat(special);
    if (params.hasOwnProperty('id'))
        fields.push('id');
    if (params.hasOwnProperty('ttl'))
        fields.push('ttl');
    for (let idx = 0; idx < fields.length; idx++) {
        if (!params.hasOwnProperty(fields[idx]))
            throw new Error("Record missing required field");
    }
    if (fields.length < Object.keys(params).keys.length)
        throw new Error("Too many fields in object");
    return true;
}
exports.validate = validate;
//# sourceMappingURL=dnsrecord.js.map