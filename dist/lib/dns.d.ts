import Api from "./api";
import { DnsRecord } from "./interfaces/dnsrecord";
declare class Dns {
    private api;
    /**
     * Create new DNS object
     *
     * @param api Instance of Api-class
     */
    constructor(api: Api);
    /**
     * Get all DNS records for a domain.
     * @param domainId Domain ID for the domain in question
     */
    getRecords(domainId: number): Promise<[DnsRecord]>;
    /**
     * Get single record
     * @param domainId Domain ID for the domain in question
     * @param recordId Record ID for the record in question
     */
    getRecord(domainId: number, recordId: number): Promise<DnsRecord>;
    /**
     * Create one record
     * @param domainId Domain ID for the domain in question
     * @param record The record to be crated
     */
    createRecord(domainId: number, record: DnsRecord): Promise<number>;
    /**
     * Modify one record
     * @param domainId Domain ID for the domain in question
     * @param recordId Record ID for the record in question
     * @param record The new content of the record
     */
    modifyRecord(domainId: number, recordId: number, record: DnsRecord): Promise<void>;
    /**
     * Delete ove record
     * @param domainId Domain ID for the domain in question
     * @param recordId Record ID for the record in question
     */
    deleteRecord(domainId: number, recordId: number): Promise<void>;
}
export = Dns;
