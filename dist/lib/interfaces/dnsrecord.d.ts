/**
 * What all records have in common.
 */
interface DnsRecordBase {
    host: string;
    data: string;
    type: string;
    ttl?: number;
    id?: number;
}
/**
 * Interface for an A-record
 */
export interface DnsRecordA extends DnsRecordBase {
    type: "A";
}
/**
 * Interface for an AAAA-record
 */
export interface DnsRecordAAAA extends DnsRecordBase {
    type: "AAAA";
}
/**
 * Interface for a CNAME-record
 */
export interface DnsRecordCname extends DnsRecordBase {
    type: "CNAME";
}
/**
 * Interface for an ANAME-record
 */
export interface DnsRecordAname extends DnsRecordBase {
    type: "ANAME";
}
/**
 * Interface for a MX-record
 */
export interface DnsRecordMX extends DnsRecordBase {
    type: "MX";
    priority: number;
}
/**
 * Interface for a SRV-record
 */
export interface DnsRecordSRV extends DnsRecordBase {
    type: "SRV";
    priority: number;
    weight: number;
    port: number;
}
/**
 * Interface for a TLSA-record
 */
export interface DnsRecordTLSA extends DnsRecordBase {
    type: "TLSA";
    usage: number;
    selector: number;
    dtype: number;
}
/**
 * Interface for a DS-record
 */
export interface DnsRecordDS extends DnsRecordBase {
    type: "DS";
    tag: number;
    alg: number;
    digest: number;
}
/**
 * Interface for a CAA-record
 */
export interface DnsRecordCAA extends DnsRecordBase {
    type: "CAA";
    flags: number;
    tag: number;
}
/**
 * Type which gathers all interfaces.
 */
export declare type DnsRecord = DnsRecordA | DnsRecordAAAA | DnsRecordCname | DnsRecordAname | DnsRecordMX | DnsRecordSRV | DnsRecordTLSA | DnsRecordDS | DnsRecordCAA;
/**
 * Performs a simple validation a DNS-record.
 * @param params Json object which describes a DNS-record.
 */
export declare function validate(params: DnsRecord): boolean;
export {};
