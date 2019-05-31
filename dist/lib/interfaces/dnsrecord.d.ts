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
export declare type DnsRecord = IDnsRecordA | IDnsRecordAAAA | IDnsRecordCname | IDnsRecordAname | IDnsRecordMX | IDnsRecordSRV | IDnsRecordTLSA | IDnsRecordTXT | IDnsRecordDS | IDnsRecordCAA;
/**
 * Performs a simple validation a DNS-record.
 * @param params Json object which describes a DNS-record.
 */
export declare function validate(params: DnsRecord): boolean;
export {};
