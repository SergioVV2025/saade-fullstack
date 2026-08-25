class BadRequestError extends Error {
  constructor(message = "Solicitud incorrecta.") {
    super(message);
    this.statusCode = 400;
  }
}

class UnauthorizedError extends Error {
  constructor(message = "Error de autorización.") {
    super(message);
    this.statusCode = 401;
  }
}

class ForbiddenError extends Error {
  constructor(message = "Acceso prohibido.") {
    super(message);
    this.statusCode = 403;
  }
}

class NotFoundError extends Error {
  constructor(message = "Recurso no encontrado.") {
    super(message);
    this.statusCode = 404;
  }
}

class ConflictError extends Error {
  constructor(message = "Conflicto con los datos existentes.") {
    super(message);
    this.statusCode = 409;
  }
}

export {
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
};
