/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
export { };

declare global {
  namespace Express {
    interface Request {
      UserAuthenticated: {
        Auth: boolean;
        Name: any;
      };
    }
  }
}
