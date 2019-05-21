/**
 * An domain name element
 */
export interface IDomainName {
    domain: string;
    id: number;
    expiry_date: string;
    registered_date: string;
    registrant: string;
    nameservers: [string];
    renew: boolean;
    status: string;
    services: IDomainNameService;
}

export interface IDomainNameService {
    dns: boolean;
    email: boolean;
    registrar: boolean;
    webhotel: string;
}
