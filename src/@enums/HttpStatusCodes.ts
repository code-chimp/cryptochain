/* eslint-disable no-magic-numbers */
enum HttpStatusCodes {
  Ok = 200,
  Created,
  Accepted,
  NoContent = 204,
  MovedPermanently = 301,
  Redirect = 302,
  BadRequest = 400,
  Unauthorized,
  Forbidden = 403,
  NotFound,
  InternalServerError = 500,
  NotImplemented,
  BadGateway,
}

export default HttpStatusCodes;
