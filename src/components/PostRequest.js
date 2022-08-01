import React from "react";
import { useState, useEffect } from "react";

function GithubUser({ username, email, phoneNumber }) {
  return (
    <div>
      <h1>User raw data</h1>
      <h2>{username}</h2>
      <p>{email}</p>
      <p>{phoneNumber}</p>
    </div>
  );
}

function PostRequest() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "mr.rousnay@gmail.com",
        password: "123456",
        deviceType: "ios",
        deviceToken: "string",
      }),
    };

    fetch(`http://13.124.197.107:3000/user/login`, requestOptions)
      .then((response) => response.json())
      .then(setData);
  }, []);

  if (data)
    return (
      <GithubUser
        username={data.data.username}
        email={data.data.email}
        phoneNumber={data.data.phoneNumber}
      />
    );
  return <h1>Data loading..</h1>;
}
export default PostRequest;
