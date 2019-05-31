/**
 * What all records have in common.
 */
interface IDnsRecordBase {
    host: string;
    data: string;
    type: string;
    ttl?: number;
    id?: number;
}

/**
 * Interface for an A-record
 */
export interface IDnsRecordA extends IDnsRecordBase {
    type: "A";
}

/**
 * Interface for an A-record
 */
export interface IDnsRecordTXT extends IDnsRecordBase {
    type: "TXT";
}

/**
 * Interface for an AAAA-record
 */
export interface IDnsRecordAAAA extends IDnsRecordBase {
    type: "AAAA";
}

/**
 * Interface for a CNAME-record
 */
export interface IDnsRecordCname extends IDnsRecordBase {
    type: "CNAME";
}

/**
 * Interface for an ANAME-record
 */
export interface IDnsRecordAname extends IDnsRecordBase {
    type: "ANAME";
}

/**
 * Interface for a MX-record
 */
export interface IDnsRecordMX extends IDnsRecordBase {
    type: "MX";
    priority: number;
}

/**
 * Interface for a SRV-record
 */
export interface IDnsRecordSRV extends IDnsRecordBase {
    type: "SRV";
    priority: number;
    weight: number;
    port: number;
}

/**
 * Interface for a TLSA-record
 */
export interface IDnsRecordTLSA extends IDnsRecordBase {
    type: "TLSA";
    usage: number;
    selector: number;
    dtype: number;
}

/**
 * Interface for a DS-record
 */
export interface IDnsRecordDS extends IDnsRecordBase {
    type: "DS";
    tag: number;
    alg: number;
    digest: number;
}

/**
 * Interface for a CAA-record
 */
export interface IDnsRecordCAA extends IDnsRecordBase {
    type: "CAA";
    flags: number;
    tag: number;
}

/**
 * Type which gathers all interfaces.
 */
export type DnsRecord = IDnsRecordA |
    IDnsRecordAAAA |
    IDnsRecordCname |
    IDnsRecordAname |
    IDnsRecordMX |
    IDnsRecordSRV |
    IDnsRecordTLSA |
    IDnsRecordTXT |
    IDnsRecordDS |
    IDnsRecordCAA;

/**
 * Performs a simple validation a DNS-record.
 * @param params Json object which describes a DNS-record.
 */
export function validate(params: DnsRecord) {
    const common: string[] = ["host", "data", "type"];
    const types: { [index: string]: string[] } = {
        A: [],
        AAAA: [],
        ANAME: [],
        CAA: ["flags", "tag"],
        CNAME: [],
        DS: ["tag", "alg", "digest"],
        MX: ["priority"],
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

    const special: string[] = types[params.type.toUpperCase()];
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

