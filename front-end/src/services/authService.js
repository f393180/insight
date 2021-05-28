/* eslint-disable no-console */
const baseUrl = process.env.REACT_APP_API_BASE_URL;
const loginUrl = `${baseUrl}/auth/login`;
const userDetailsUrl = `${baseUrl}/users/login/`;

export default async function authenticateUser(username, password) {
  const data = JSON.stringify({
    username,
    password,
  });
  const response = await fetch(loginUrl, {
    method: "POST",
    headers: {
      "Contentd-Type": "application/json",
    },
    body: data,
  });
  console.log(response);
  if (response.ok) return response.json();
  throw response;
}
