type toJSONType = {
  status: number | undefined;
  message: string;
};

interface IHttpError {
  msg: string;
  code: number;
}

export const BAD_REQUEST = {
  msg: 'BadRequest',
  code: 400,
};

export const NOT_FOUND = {
  msg: 'NotFound',
  code: 404,
};

export const UNAUTHORIZED = {
  msg: 'Unauthorized',
  code: 401,
};

export const FORBIDDEN = {
  msg: 'Forbidden',
  code: 403,
};

export const SERVER_ERROR = {
  msg: 'InternalServerError',
  code: 500,
};

export default class HttpError extends Error {
  statusCode: number;

  constructor({ msg = 'InternalServerError', code = 500 }: IHttpError) {
    super();
    this.message = msg;
    this.statusCode = code;
  }

  toJSON(): toJSONType {
    return {
      status: this.statusCode,
      message: this.message,
    };
  }
}
