import jwt from "jsonwebtoken";

const handleAuthError = (res, statusCode) => {
  res.status(statusCode).send({ message: "Error de autorización!" });
};

const extractBearerToken = (header) => {
  return header.replace("Bearer ", "");
};

export default (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return handleAuthError(res, 401);
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return handleAuthError(res, 403);
  }

  req.user = payload; // añadir el payload al objeto Request

  next(); // pasar la solicitud más adelante
};
