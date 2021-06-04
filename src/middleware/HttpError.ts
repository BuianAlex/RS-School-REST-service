class HttpError extends Error {
  message: string;

  status: number | undefined;

  constructor(message: string) {
    super();
    this.message = message;
    this.status = 0;
  }

  toJSON(): { status: number | undefined; message: string } {
    return {
      status: this.status,
      message: this.message,
    };
  }
}

export default HttpError;
