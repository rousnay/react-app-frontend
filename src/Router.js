import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrivateRoutes } from "./auth/PrivateRoutes";

const Landing = lazy(() => import("./pages/Home/Landing"));
const Home = lazy(() => import("./pages/Home/"));
const SignIn = lazy(() => import("./pages/SignIn"));
const Callback = lazy(() => import("./auth/Callback"));
const SignUp = lazy(() => import("./pages/SignUp"));
const EmailSignUp = lazy(() => import("./pages/SignUp/EmailSignUp"));
const EmailVerification = lazy(() =>
  import("./pages/SignUp/EmailVerification")
);
const UpdateUserInformation = lazy(() =>
  import("./pages/SignUp/UpdateUserInformation")
);
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Channel = lazy(() => import("./pages/Channel"));
const ChannelProfile = lazy(() => import("./pages/Channel/ChannelProfile"));
const CreateTrack = lazy(() => import("./pages/CreateTrack/"));
const MetaInfo = lazy(() => import("./pages/CreateTrack/MetaInfo"));
const TrackReview = lazy(() => import("./pages/CreateTrack/TrackReview"));
const ManageTracks = lazy(() => import("./pages/Management/Tracks"));
const ManageComments = lazy(() => import("./pages/Management/Comments"));

export const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/" element={<Landing />} exact />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/auth/Callback" element={<Callback />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="SignUp/EmailSignUp" element={<EmailSignUp />} />
          <Route
            path="SignUp/EmailVerification"
            element={<EmailVerification />}
          />
          <Route element={<PrivateRoutes />}>
            <Route
              path="SignUp/UpdateUserInformation"
              element={<UpdateUserInformation />}
            />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Channel" element={<Channel />} />
            <Route
              path="/Channel/ChannelProfile"
              element={<ChannelProfile />}
            />
            <Route path="/CreateTrack" element={<CreateTrack />} />
            <Route path="CreateTrack/MetaInfo" element={<MetaInfo />} />
            <Route path="CreateTrack/TrackReview" element={<TrackReview />} />
            <Route path="Management/Tracks" element={<ManageTracks />} />
            <Route path="Management/Comments" element={<ManageComments />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
