import { Copy } from "src/app/copy-management/interfaces/Copy.interface";
import { Review } from "src/app/user-library-client/interfaces/Review.interface";

export interface Resource{
  id?:              number;
  title:            string;
  publishedYear:    number;
  copies?:          Copy[];
  reviews?:         Review[];
  type?:            string;
}
