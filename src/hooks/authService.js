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
  localStorage.removeItem("accessToken");
  localStorage.getItem("user");
};

export function logIn(payload, config, setLoading, setError) {
  setLoading(true);
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  let jsonData = { ...config, ...payload };
  for (const property in jsonData) {
    urlencoded.append(property, jsonData[property]);
  }

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  try{
    fetch(
        "http://localhost:8080/realms/master/protocol/openid-connect/token",
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          setAccessToken(data?.access_token);
          setRefreshToken(data?.refresh_token);
          setLoading(false);
          window.location.href = "/";
        })
        .catch((error) => {
          console.error("Error authenticating user:", error);
          setError(error)
        });
  }catch(error){
    console.error("an error occured : ", error);
    setError(error)
  }
 
}

export const acquireSilentToken = (config) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();

  var jsonData = {
    ...config,
    grant_type: "refresh_token",
    refresh_token: getRefreshToken(),
  };
  for (const property in jsonData) {
    urlencoded.append(property, jsonData[property]);
  }

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  fetch(
    "http://localhost:8080/realms/master/protocol/openid-connect/token",
    requestOptions
  )
    .then((response) => response.json())
    .then((data) => {
      setAccessToken(data?.access_token);
      setRefreshToken(data?.refresh_token);
    })
    .catch((error) => {
      console.error("Error acquiring new token:", error);
      localStorage.removeItem("accessToken");
      localStorage.getItem("user");
      window.location.href = "/logout";
    });
};
