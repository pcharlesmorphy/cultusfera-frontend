
export interface Author{
  id:             number;
  name:           string;
  surnames:       string;
  role:           Role;
}

export interface Role{
  id:             number;
  type:           string;
}
