export interface LogInResponseModel {
  authenticationToken: string;
  refreshToken: string;
  expiresAt: Date;
  username: string;
}
