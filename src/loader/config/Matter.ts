
export interface Matter {
  date : Date;
  role ?: string;
  title ?: string;
  description ?: string;
  permalink ?: string;
  layout ?: string;
  image ?: string;
  output ?: boolean;
  categories ?: string[];
  category ?: string;
  tags ?: string[];
  feed ?: boolean;
  limit ?: number;
}

export default Matter;

