import { Resource } from "src/app/shared/interfaces/Resource.interface";
import { Transaction, TransactionStatus } from '../../historic-search/interfaces/Transaction.interface';


export interface Copy {
  id?:                number;
  registrationDate:   Date;
  dismissalDate?:     Date;
  status:             StatusCopy;
  location:           Location;
  resource:           Resource;
  transactions?:      Transaction[];
}

export interface StatusCopy {
  id?:                number;
  status:             string;
}

export interface Location {
  id?:                number;
  name:               string;
  address:            string;
  phone:              string;
}

export interface CopyResource{
  id?:                number;
  status:             StatusCopy;
  location:            Location;
  transactionStatus:   TransactionStatus;
}
