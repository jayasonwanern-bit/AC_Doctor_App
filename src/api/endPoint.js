 const endPoint = {
  LOGIN: '/user/login',
  VERIFY_OTP: '/user/verify-otp',
  RESET_OTP: '/user/resend-otp',
  USER_PROFILE: '/user/get-profile/',
  UPDATE_PROFILE: '/user/profile-update',
  LOG_OUT: '/user/logout/',

  // Address service
  ADD_EDIT_ADDRESS:'user/address-add-edit',
  ADDRESS_GET:'user/address-list/',
  ADDRESS_DELETE:'user/address-delete/',

  //  HOME 
  AUTH_PATNER: 'user/partner-list', //GET
  SERVICE_CATEGORIES: 'user/service-list', //GET
  BANNER_HOME: 'user/home-screen-data', //logo

  //  REQUREST SERVICE
  ERROR_CODES: 'user/error-code/list', //GET
};
export default endPoint;