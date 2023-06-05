

export interface Transaction {

id?:              number;
startDate:        Date;
endDate?:         Date;
userId:           number;
status?:          TransactionStatus;
copyId:           number;

}

export interface TransactionStatus{
  id?:            number;
  type:           string;
}

export interface FrontendTransaction {

  resourceTitle:              string;
  publishedYear:              number;
  resourceType:               string;
  resourceLocation:           string;
  startDate:                  Date;
  endDate:                    Date;
  user:                       string;
  transactionStatus:          string;

}
