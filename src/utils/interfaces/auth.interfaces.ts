export interface TDUser {
  id: string;
  providerId: string;
  provider: string;
  name: string;
  avatar: string;
  group: string;
  permission: string[];
  member_since: number;
  last_login: number;
}
