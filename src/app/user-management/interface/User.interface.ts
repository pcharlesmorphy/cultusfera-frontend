export interface User{

  id?:                   number;
  name:                  string;
  surnames:              string;
  email:                 string;
  nif:                   string;
  address:               string;
  phone:                 string;
  username:              string;
  password?:             string;
  registrationDate:      Date;
  role:                  UserRole;
  suspended?:             boolean;
  //penalties?:            Penalty[];

}

export interface UserRole{
  id?:                   number;
  type:                  string;
}

export interface UpdateUser{
  id?:                   number;
  email?:                 string;
  address?:               string;
  phone?:                 string;
  password?:              string;
}
