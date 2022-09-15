import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrivateRoutes } from "./auth/PrivateRoutes";

const Home = lazy(() => import("./pages/Home/Home"));
const Landing = lazy(() => import("./pages/Home/Landing"));
const SignUp = lazy(() => import("./pages/SignUp/SignUp"));
const SignUpForm = lazy(() => import("./pages/SignUp/SignUpForm"));
const MobileVerification = lazy(() =>
  import("./pages/SignUp/MobileVerification")
);
const AddUserInformation = lazy(() =>
  import("./pages/SignUp/AddUserInformation")
);
const SignIn = lazy(() => import("./pages/SignIn/SignIn"));
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
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/SignUpForm" element={<SignUpForm />} />
          <Route path="/SignIn" element={<SignIn />} />

          <Route element={<PrivateRoutes />}>
            <Route
              path="/MobileVerification"
              element={<MobileVerification />}
            />
            <Route
              path="/AddUserInformation"
              element={<AddUserInformation />}
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
