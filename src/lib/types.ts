export interface ILogin {
  email: string;
  password: string;
  otp: string;
}

export interface IStudent {
  fullName: string;
  age: string;
  gender: string;
  address: string;
  city: string;
  program: string;
  previousTraining: string;
  guardianName: string;
  guardianContact: string;
  guardianEmail: string;
  guardianRelationship: string;
}

export interface IAssesssment {
  date: string;
  remark: string;
  punctuality: string;
  attentive: string;
  behaviour: string;
  assignment: string;
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
