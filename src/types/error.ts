export class AppError extends Error {
  constructor(
    public statusCode: number,
    public status: string,
    public message: string
  ) {
    super(message);
    this.statusCode = statusCode;
    this.status = status;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(404, "fail", message);
  }
}

export class BadRequestError extends AppError {
  constructor(message: string) {
    super(400, "fail", message);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string) {
    super(401, "fail", message);
  }
}
