const baseUrl = process.env.REACT_APP_BASE_URL + "/auth/v1";

export const isLogged = () => {
  return localStorage.getItem("accessToken") !== null;
};

export const getUser = () => {
  return localStorage.getItem("user");
};

export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

export const setAccessToken = (accessToken) => {
  accessToken && localStorage.setItem("accessToken", accessToken);
};

export const getRefreshToken = () => {
  return localStorage.getItem("refreshToken");
};

export const setRefreshToken = (refreshToken) => {
  refreshToken && localStorage.setItem("refreshToken", refreshToken);
};

export const logOut = () => {
  localStorage.clear();
  window.location.href = "/login";
};

export function logIn(payload, config, setLoading, setError) {
  setLoading(true);
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let raw = JSON.stringify({ ...config, ...payload });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    fetch(baseUrl + "/token", requestOptions)
      .then((response) => response.text())
      .then((data) => {
        setAccessToken(JSON.parse(data)?.accessToken);
        setRefreshToken(JSON.parse(data)?.refreshToken);
        setLoading(false);
        window.location.href = "/";
      })
      .catch((error) => {
        console.error("Error authenticating user:", error);
        setError(error);
      });
  } catch (error) {
    console.error("an error occured : ", error);
    setError(error);
  }
}

export const acquireSilentToken = (config) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    ...config,
    grant_type: "refreshToken",
    refreshToken: getRefreshToken(),
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(baseUrl + "/refreshToken", requestOptions)
    .then((response) => response.text())
    .then((data) => {
      setAccessToken(JSON.parse(data)?.accessToken);
      setRefreshToken(JSON.parse(data)?.refreshToken);
    })
    .catch((error) => {
      console.error("Error acquiring new token:", error);
      localStorage.removeItem("accessToken");
      localStorage.getItem("user");
      window.location.href = "/logout";
    });
};
