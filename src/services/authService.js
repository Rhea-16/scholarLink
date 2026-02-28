import axios from 'axios';
const API_BASE_URL = "http://localhost:8000";

export async function signup(data) {
  const response = await fetch(`${API_BASE_URL}/auth/signUp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.detail || "Signup failed");
  }

  return response.json();
}

// export async function login(data) {
//   const response = await fetch(`${API_BASE_URL}/auth/login`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });

//   if (!response.ok) {
//     const err = await response.json();
//     throw new Error(err.detail || "Login failed");
//   }

//   return response.json();
// }

// export const login = async (email, password) => {
//   const formData = new URLSearchParams();
//   formData.append("username", email);
//   formData.append("password", password);

//   const response = await axios.post(
//     `${API_BASE_URL}/auth/login`,
//     formData,
//     {
//       headers: { "Content-Type": "application/x-www-form-urlencoded" }
//     }
//   );

//   return response.data;
// };

export const login = async (email, password) => {
  const response = await axios.post(
    `${API_BASE_URL}/auth/login`,
    {
      email: email,
      password: password,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

export async function getMe(token) {
  const response = await fetch(`${API_BASE_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Unauthorized");
  }

  return response.json();
}
