export enum ERROR {
  //final push
  //error messages
  //admin
  //shopkeep
  //login
  LOGIN_INVALID = "Login is invalid",
  LOGIN_BLANK = "Please fill in both login fields",
  LOGIN_HTTP_ERROR = "Unable to login, try again",

  //register
  REGISTER_INVALID_EMAIL_MESSAGE = "You must provide a valid email",
  REGISTER_INVALID_EMAIL_UNIQUE_MESSAGE = "This email has already been used",
  REGISTER_INVALID_FIRST_NAME_MESSAGE = "You must provide a first name",
  REGISTER_INVALID_LAST_NAME_MESSAGE = "You must provide a last name",
  REGISTER_INVALID_PASSWORD_LENGTH_MESSAGE = "Password must be at least 4 characters",
  REGISTER_INVALID_PASSWORD_MATCH = "Passwords do not match",
  REGISTER_HTTP_ERROR_MESSAGE = "Unable to create your account, please try again later",

  //product
  PRODUCT_INVALID_ID = "Error: This product id does not exist",
  PRODUCT_HTTP_ERROR = "Error: Unable to get the list of products, please try again later",
  PRODUCT_NAME_BLANK = "Error: Product name cannot be blank",
  PRODUCT_PRODUCT_PRICE = "Error: Product price must be greater than 0",
  PRODUCT_SALE_PRICE = "Error: Product price must be lower than product price and greater than 0",

  //cart
  //category
  CATEGORY_HTTP_ERROR = "Error: Unable to retrieve list of categories, please try again later",
  CATEGORY_UNDEFINED_ERROR = "Error: Category Undefined",
  CATEGORY_EMPTY = "Error: Category cannot be empty",
}
