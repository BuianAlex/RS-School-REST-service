import statusCodes from '../common/statusCodes';

class HttpError extends Error {
  message: string;

  status: number | undefined;

  constructor(message: string) {
    super();
    this.message = message;
    this.status = statusCodes[this.message];
  }

  toJSON(): { status: number | undefined; message: string } {
    return {
      status: this.status,
      message: this.message,
    };
  }
}

export default HttpError;
