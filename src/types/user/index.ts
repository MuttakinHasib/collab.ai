import { BaseEntity } from "../base";

export interface User extends Pick<BaseEntity, "id"> {
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  avatar: string | null;
  phone: string | null;
  date_joined: string;
  last_login: string;
}
