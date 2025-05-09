export const config = {
  /*********************API URL****************/
  //PROD
  //apiUrl: "https://api-admin.syncware.com/api/v1/admin",

  //UAT
  apiUrl: import.meta.env.VITE_BASE_API_URL,

  //DEV
  //apiUrl: "https://api-dev-admin.syncware.com/api/v1/admin",

  //LOCAL
  //apiUrl: "https://localhost:7277/api/v1/retailer",

  //AS PER CI/CD FOR PORT
  //apiUrl: "https://api-uat-admin.syncware.com:50925/api/v1/admin",

  /*********************MOCK URL****************/
  //DEV
  mockUrl: "https://api-dev.syncware.com:3004/",

  /*********************CAPTHCA KEY****************/
  //PROD
  //captchaKey: "6LdAmHMpAAAAAKEBvOQyRO5Zxki_h9dQkQBLn9HQ",

  //localhost v3
  //captchaKey: "6Le0XHIpAAAAAPplbl3R6LE9nImeG6NK-YiUfgYX",

  //UAT captcha v3
  captchaKey: "6Ldt53QpAAAAAFpmUdqGjrlDxS5C0wFtzX3-2DEK",

  /*********************OLD SITE URL****************/
  //PROD
  //oldSiteUrl: "https://admin.syncware.com/",

  //UAT
  oldSiteUrl: "https://admin-uat.syncware.com/",

  /*********************SSO SITE URL****************/
  //LOCAL:
  //ssoUrl: "http://localhost:3000/login?redirectSyncwareURL=http://localhost:5173",

  //UAT:
  ssoUrl: "https://app-uat.syncware.com/login?redirectSyncwareURL=https://replenish-uat.syncware.com:40994",
};
