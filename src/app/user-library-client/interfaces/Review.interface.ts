export interface Review{
  id?:             number;
  date:            Date;
  title:           string;
  comment:         string;
  rating:          number;
  resourceId:      number;
  userId:          number;
  username?:       string;
  resourceTitle?:  string;
}
