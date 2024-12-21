export interface ApiError extends Error {
  statusCode: number;
  status: string;
}

export class NotFoundError extends Error implements ApiError {
  statusCode = 404;
  status = "error";

  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}

export class UnauthorizedError extends Error implements ApiError {
  statusCode = 401;
  status = "error";

  constructor(message: string) {
    super(message);
    this.name = "UnauthorizedError";
  }
}

export class BadRequestError extends Error implements ApiError {
  statusCode = 400;
  status = "error";

  constructor(message: string) {
    super(message);
    this.name = "BadRequestError";
  }
}
