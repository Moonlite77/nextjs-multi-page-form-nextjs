export interface FormErrors {
  [key: string]: string | undefined;
}

export enum AddDealRoutes {
  PRODUCT_INFO = '/add/step-one',
  COUPON_DETAILS = '/add/step-two',
  CONTACT_INFO = '/add/step-three',
  COOL_CHECKBOX='/add/step-four',
  REVIEW_DEAL = '/add/review',
  CLEARANCE = '/add/step-five',
  CLIENT_EMAIL = '/add/step-six',
}
