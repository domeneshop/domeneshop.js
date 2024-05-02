import Api from "./api";
import { DnsRecord, validate } from "./interfaces/dnsrecord";

class Dns {
  private api: Api;

  /**
   * Create new DNS object
   *
   * @param api Instance of Api-class
   */
  constructor(api: Api) {
    this.api = api;
  }

  /**
   * Get all DNS records for a domain.
   * @param domainId Domain ID for the domain in question
   *
   * @returns Promise with all DNS records on a domain
   */
  public async getRecords(domainId: number): Promise<[DnsRecord]> {
    const res = await this.api.apiCall("GET", `/domains/${domainId}/dns`);
    return res.data;
  }

  /**
   * Get single record
   * @param domainId Domain ID for the domain in question
   * @param recordId Record ID for the record in question
   *
   * @returns Promise with one specific DNS record on a domain
   */
  public async getRecord(
    domainId: number,
    recordId: number
  ): Promise<DnsRecord> {
    const res = await this.api.apiCall(
      "GET",
      `/domains/${domainId}/dns/${recordId}`
    );
    return res.data;
  }

  /**
   * Create one record
   * @param domainId Domain ID for the domain in question
   * @param record The record to be created
   *
   * @returns Promise with the ID of the created DNS record
   */
  public async createRecord(
    domainId: number,
    record: DnsRecord
  ): Promise<number> {
    validate(record);
    const res = await this.api.apiCall(
      "POST",
      `/domains/${domainId}/dns`,
      record
    );
    const location = res.headers.location;
    if (location) {
      return parseInt(location.split("/").slice(-1)[0], 10);
    } else {
      throw new Error("This is not happening!!!!");
    }
  }

  /**
   * Modify one record
   * @param domainId Domain ID for the domain in question
   * @param recordId Record ID for the record in question
   * @param record The new content of the record
   */
  public async modifyRecord(
    domainId: number,
    recordId: number,
    record: DnsRecord
  ): Promise<void> {
    validate(record);
    await this.api.apiCall(
      "PUT",
      `/domains/${domainId}/dns/${recordId}`,
      record
    );
  }

  /**
   * Delete one record
   * @param domainId Domain ID for the domain in question
   * @param recordId Record ID for the record in question
   */
  public async deleteRecord(domainId: number, recordId: number): Promise<void> {
    await this.api.apiCall("DELETE", `/domains/${domainId}/dns/${recordId}`);
  }
}

export = Dns;
