import Api from "./api";
import { IForward } from "./interfaces/forward";

class Forwards {
  private api: Api;

  /**
   * Create new Forwards object
   *
   * @param api Instance of Api-class
   */
  constructor(api: Api) {
    this.api = api;
  }

  /**
   * Get all forwardings at a domain.
   * @param domainId Domain ID for the domain in question
   *
   * @returns Promise with forwarding data for every hostname.
   */
  public async getForwards(domainId: number): Promise<[IForward]> {
    const res = await this.api.apiCall("GET", `/domains/${domainId}/forwards`);
    return res.data;
  }

  /**
   * Get single forwarding for a host
   * @param domainId Domain ID for the domain in question
   * @param host Hostname for the forwarding in question
   *
   * @returns Promise with forwarding data.
   */
  public async getForward(domainId: number, host: string): Promise<IForward> {
    const res = await this.api.apiCall(
      "GET",
      `/domains/${domainId}/forwards/${host}`
    );
    return res.data;
  }

  /**
   * Create forwarding for a host
   * @param domainId Domain ID for the domain in question
   * @param forward The forwarding to be created
   *
   * @returns Promise with hostname
   */
  public async createForward(
    domainId: number,
    forward: IForward
  ): Promise<string> {
    const res = await this.api.apiCall(
      "POST",
      `/domains/${domainId}/forwards`,
      forward
    );
    const location = res.headers.location;
    if (location) {
      return location.split("/").slice(-1)[0];
    } else {
      throw new Error("This is not happening!!!!");
    }
  }

  /**
   * Modify forwarding for a host
   * @param domainId Domain ID for the domain in question
   * @param host Hostname for the forwarding in question
   * @param forward The new content of the forwarding
   */
  public async modifyForward(
    domainId: number,
    host: string,
    forward: IForward
  ): Promise<void> {
    await this.api.apiCall(
      "PUT",
      `/domains/${domainId}/forwards/${host}`,
      forward
    );
  }

  /**
   * Delete forwarding for a host
   * @param domainId Domain ID for the domain in question
   * @param host Hostname for the forwarding in question
   */
  public async deleteForward(domainId: number, host: string): Promise<void> {
    await this.api.apiCall("DELETE", `/domains/${domainId}/forwards/${host}`);
  }
}

export = Forwards;
