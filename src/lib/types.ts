export interface ILogin {
  email: string;
  password: string;
  otp: string;
}

export interface IUser {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phone: string;
  roles: string[];
  created: string;
  updated: string;
}

export interface IInstructor {
  id: string;
  email: string;
  status: string;
  created: string;
  updated: string;
  userProfile: IUser;
}

export interface ICohort {
  id?: string;
  name?: string;
  active?: boolean;
  startDate?: string;
  endDate?: string;
  created?: string;
  updated?: string;
}
export interface IProgram {
  id?: string;
  name?: string;
  description?: string;
  created?: string;
  updated?: string;
}

export interface IStudent {
  id?: string;
  regNo?: string;
  fullName?: string;
  age?: number;
  gender?: string;
  lastSchool?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  guardianName?: string;
  guardianPhone?: string;
  guardianEmail?: string;
  guardianAddress?: string;
  guardianRelationship?: string;
  photoUrl?: string;
  status?: "COMPLETED" | "SUSPENDED";
  attendanceStatus?: "PRESENT" | "ABSENT";
  lastAttendanceUpdate?: string;
  created?: string;
  updated?: string;
  cohort?: ICohort;
  program?: IProgram;
  previousTraining?: string;
}

export interface IAssesssment {
  id?: string;
  attentive?: string;
  behaviour?: string;
  assignment?: string;
  remarks?: string;
  date?: string;
  created?: string;
  updated?: string;
  student?: IStudent;
  studentId?: string;
  punctuality?: string;
  instructor?: IInstructor;
}
export interface IAttendance {
  id?: string;
  date?: string;
  signInTime?: string;
  signOutTime?: string;
  created?: string;
  updated?: string;
  student?: IStudent;
}

export interface IResponse {
  status: {
    code: number;
    message: string;
  };
}
export interface IUserLoginResponse {
  status: {
    code: number;
    message: string;
  };
  data: {
    authentication: {
      profile: {
        firstname: string;
        lastname: string;
        email: string;
        phone: string;
      };
      permissions: string[];
      authorizationToken: string;
      refreshToken: string;
    };
  };
}
export interface IErrorResponse {
  status: {
    code: number;
    message: string;
  };
}
