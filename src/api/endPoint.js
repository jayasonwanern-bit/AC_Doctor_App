 const endPoint = {
  LOGIN: 'user/login',
  VERIFY_OTP: 'user/verify-otp',
  RESETOTP: 'user/resend-otp',
  USER_PROFILE: 'user/get-profile/:userId',
  UPDATE_PROFILE: 'user/profile-update',
  LOG_OUT: 'user/logout/:userId',

  //  HOME 
  AUTH_PATNER: 'user/partner-list', //GET
  SERVICE_CATEGORIES: 'user/service-list', //GET
  // LOGO: 'user/home-screen-data', //logo

  //  REQUREST SERVICE
  ERROR_CODES: 'user/error-code/list', //GET
};
export default endPoint;