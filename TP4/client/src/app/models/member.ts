export interface EmailAddress {
    local: string,
    domain: string;
}

export interface PostalAddress {
    addressNumber: number;
    streetName: string;
    appartmentNumber: number | null;
    postalCode: string;
    city: string;
}

export interface Date {
    day: number;
    month: number;
    year: number;
}

export interface creditCard {
    number: number;
    titulaire: string;
    expirationDate: Date;
    ccv: number;
}

export class Member {
    password: string;
    firstName: string;
    lastName: string;
    emailAddress: EmailAddress;
    postalAddress: PostalAddress;
    creditCards: creditCard[];
    monthly: boolean;
    beginningDate: Date | null;
    endingDate: Date | null;

    constructor(password: string, firstName: string, lastName: string, emailAddress: EmailAddress, postalAddress: PostalAddress, creditCards: creditCard[], monthly: boolean, beginningDate: Date | null, endingDate: Date | null) {
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.emailAddress = emailAddress;
        this.postalAddress = postalAddress;
        this.creditCards = creditCards;
        this.monthly = monthly;
        this.beginningDate = beginningDate;
        this.endingDate = endingDate;
    }
  }
