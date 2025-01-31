export interface IconPros {
  size?: number;
  width?: number;
  height?: number;
  className?: string;
  props?: any;
}

export interface IBanner {
  _id?: string;
  image: string;
  title: string;
  startDate: Date;
  endDate: Date;
}

export interface IEmployee {
  _id: string;
  employeeNumber: string;
  fullName: string;
  email: string;
  gender: string;
  dateJoined: string;
  reportingTo: string;
  department: string;
  jobTitle: string;
  workerType: string;
  businessUnit: string;
}

export interface IEvents {
  _id?: string;
  title: string;
  date: Date;
  image: string;
  description: string;
}

export interface IFeedback {
  _id: string;
  date: string;
  comment: string;
  type: string;
  rating?: number;
}

export interface IValues {
  date: string;
  count: number;
}

export interface IOnboarding {
  _id: string;
  days: number;
  email: string;
}

export interface IQuestion {
  _id?: string;
  title: string;
  question: string;
  rationOutOf: number;
}

export interface IIdeas {
  _id?: string;
  email: string;
  department: string;
  idea: string;
  date: string;
}
