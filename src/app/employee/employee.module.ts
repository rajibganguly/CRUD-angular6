export class Employee {
  id: number;
  name: string;
  category: string;
  address: string;
  skills: any;
  profilepicpath: string;
  doj: string;
  locations: Location[];
}

export interface EmployeeHints {
  id: number,
  skills: string;
  name: string;
  profilepicpath: string;
}

export interface Location {
  enddate: string,
  lacation: string;
  project: string;
  projectcode: string;
  startdate: string;
}

