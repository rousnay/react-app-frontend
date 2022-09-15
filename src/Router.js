import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrivateRoutes } from "./auth/PrivateRoutes";

const Home = lazy(() => import("./pages/Home/Home"));
const Landing = lazy(() => import("./pages/Home/Landing"));
const SignIn = lazy(() => import("./pages/SignIn/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp/SignUp"));
const EmailSignUp = lazy(() => import("./pages/SignUp/EmailSignUp"));
const EmailVerification = lazy(() =>
  import("./pages/SignUp/EmailVerification")
);
const UpdateUserInformation = lazy(() =>
  import("./pages/SignUp/UpdateUserInformation")
);
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const Channel = lazy(() => import("./pages/Channel/Channel"));
const ChannelProfile = lazy(() => import("./pages/Channel/ChannelProfile"));
const CreateTrack = lazy(() => import("./pages/MetaTracks/CreateTrack"));
const MetaInfo = lazy(() => import("./pages/MetaTracks/MetaInfo"));
const TrackReview = lazy(() => import("./pages/MetaTracks/TrackReview"));
const ManageTracks = lazy(() => import("./pages/Management/ManageTracks"));
const ManageComments = lazy(() => import("./pages/Management/ManageComments"));

export const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/Landing" element={<Landing />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/EmailSignUp" element={<EmailSignUp />} />
          <Route path="/EmailVerification" element={<EmailVerification />} />
          <Route element={<PrivateRoutes />}>
            <Route
              path="/UpdateUserInformation"
              element={<UpdateUserInformation />}
            />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Channel" element={<Channel />} />
            <Route path="/ChannelProfile" element={<ChannelProfile />} />
            <Route path="/CreateTrack" element={<CreateTrack />} />
            <Route path="/MetaInfo" element={<MetaInfo />} />
            <Route path="/TrackReview" element={<TrackReview />} />
            <Route path="Management/ManageTracks" element={<ManageTracks />} />
            <Route
              path="Management/ManageComments"
              element={<ManageComments />}
            />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
