import { Resource } from "src/app/shared/interfaces/Resource.interface";
import { Language } from "../../books-management/interfaces/Book.interface";

export interface Magazine extends Resource{
  numberMagazine:   number;
  month:            Month;
  pages:            number;
  publisher:        MagazinePublisher;
  subject:          MagazineSubject;
  language:         Language;
}

export interface MagazinePublisher{
  id:             number;
  name:           string;
}

export interface MagazineSubject{
  id:             number;
  name:           string;
}

export interface Month{
  id:             number;
  name:           string;
}
