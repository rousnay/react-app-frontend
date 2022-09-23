import { useState } from "react";

// Manage token ==================
export const useToken = () => {
  const [token, setTokenInternal] = useState(() => {
    return localStorage.getItem("token");
  });

  const setToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setTokenInternal(newToken);
  };
  //   console.log(token);
  return [token, setToken];
};

// Manage user info ==================
export const useUser = () => {
  const [user, setUserInternal] = useState(() => {
    return JSON.parse(localStorage.getItem("user"));
  });

  const setUser = (newUser) => {
    localStorage.setItem("user", JSON.stringify(newUser));
    setUserInternal(newUser);
  };
  //   console.log(user);
  return [user, setUser];
};

// Manage channel ID ==================
export const useChannel = () => {
  const [channel, setChannelInternal] = useState(() => {
    return localStorage.getItem("channel");
  });

  const setChannel = (newChannel) => {
    localStorage.setItem("channel", newChannel);
    setChannelInternal(newChannel);
  };
  return [channel, setChannel];
};

// Manage Track ID ==================
export const useTrack = () => {
  const [track, setTrackInternal] = useState(() => {
    return localStorage.getItem("track");
  });

  const setTrack = (newTrack) => {
    localStorage.setItem("track", newTrack);
    setTrackInternal(newTrack);
  };
  return [track, setTrack];
};
