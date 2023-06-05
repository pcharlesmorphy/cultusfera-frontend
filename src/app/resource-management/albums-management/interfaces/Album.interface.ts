import { Resource } from "src/app/shared/interfaces/Resource.interface";

export interface Album extends Resource{
  musician:         Musician;
  duration:         number;
  recordCompany:    RecordCompany;
  genre:            MusicGenre;
}

export interface RecordCompany{
  id:               number;
  name:             string;
}

export interface MusicGenre{
  id:               number;
  name:             string;
}

export interface Musician{
  id:             number;
  name:           string;
  surnames:       string;
}
