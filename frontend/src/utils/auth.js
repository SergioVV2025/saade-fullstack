const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const signin = async (email, password) => {
  const response = await fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error al iniciar sesión.");
  }

  return data;
};

const signup = async (name, email, password, confirmPassword) => {
  const response = await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
      confirmPassword,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error al registrar usuario.");
  }

  return data;
};

const getCurrentUser = async (token) => {
  const response = await fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(`${BASE_URL}/users/me`);

  const data = await response.json();

  console.log(data);

  if (!response.ok) {
    throw new Error(data.message || "Error al obtener el usuario.");
  }

  return data;
};

export { signin, signup, getCurrentUser };
