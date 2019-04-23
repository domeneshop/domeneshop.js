/**
 * An domain name element
 */
export interface DomainName {
    domain: string;
    id: number;
    expiry_date: string;
    registered_date: string;
    registrant: string;
    nameservers: [string];
    renew: boolean;
    status: string;
    services: DomainNameService;
}

export interface DomainNameService {
    dns: boolean;
    email: boolean;
    registrar: boolean;
    webhotel: string;
}