export class Employee {
  id: number;
  name: string;
  category: string;
  skills: any;
  profilepicpath: string;
  doj: string;
}

export interface EmployeeHints {
  skills: string;
  name: string;
  profilepicpath: string;
}
