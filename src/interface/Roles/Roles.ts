export interface RoleResponse {
  data: IRoles[];
}

export interface IRoles {
  id: number;
  name: string;
  description: string;
}
