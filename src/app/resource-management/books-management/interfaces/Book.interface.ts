import { Copy } from "src/app/copy-management/interfaces/Copy.interface";
import { Resource } from "src/app/shared/interfaces/Resource.interface";

export interface Book extends Resource {
  writers:          Writer[];
  isbn:             string;
  pages:            number;
  synopsis:         string;
  publisher:        BookPublisher;
  genre:            LiteraryGenre;
  language:         Language;
}

export interface BookPublisher{
  id:               number;
  name:           string;
}

export interface LiteraryGenre{
  id:               number;
  name:           string;
}

export interface Language{
  id:               number;
  name:           string;
}

export interface Writer{
  id:             number;
  name:           string;
  surnames:       string;
}
