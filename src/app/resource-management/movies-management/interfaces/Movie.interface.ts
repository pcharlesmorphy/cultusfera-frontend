import { Resource } from "src/app/shared/interfaces/Resource.interface";
import { Language } from "../../books-management/interfaces/Book.interface";

export interface Movie extends Resource{
  synopsis:           string;
  duration:           number;
  genre:              MovieGenre;
  director:           Director;
  actors:             Actor[];
  language:           Language;
}

export interface MovieGenre{
  id:          number;
  name:        string;
}

export interface Director{
  id:          number;
  name:        string;
  surnames:    string;
}

export interface Actor{
  id:          number;
  name:        string;
  surnames:    string;
}
