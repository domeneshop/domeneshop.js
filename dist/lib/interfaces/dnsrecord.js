"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Performs a simple validation a DNS-record.
 * @param params Json object which describes a DNS-record.
 */
function validate(params) {
    const common = ["host", "data", "type"];
    const types = {
        A: [],
        AAAA: [],
        ANAME: [],
        CAA: ["flags", "tag"],
        CNAME: [],
        DS: ["tag", "alg", "digest"],
        MX: ["priority"],
        NS: [],
        SRV: ["priority", "weight", "port"],
        TLSA: ["usage", "selector", "dtype"],
        TXT: [],
    };
    if (!params.hasOwnProperty("type")) {
        throw new Error("Record does not have any type");
    }
    if (!types.hasOwnProperty(params.type.toUpperCase())) {
        throw new Error("Record has an unknown type");
    }
    const special = types[params.type.toUpperCase()];
    const fields = common.concat(special);
    if (params.hasOwnProperty("id")) {
        fields.push("id");
    }
    if (params.hasOwnProperty("ttl")) {
        fields.push("ttl");
    }
    for (const field of fields) {
        if (!params.hasOwnProperty(field)) {
            throw new Error("Record missing required field");
        }
    }
    if (fields.length < Object.keys(params).keys.length) {
        throw new Error("Too many fields in object");
    }
    return true;
}
exports.validate = validate;
//# sourceMappingURL=dnsrecord.js.map