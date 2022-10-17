import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrivateRoutes } from "./auth/PrivateRoutes";

const Home = lazy(() => import("./pages/Home/"));
const SignIn = lazy(() => import("./pages/SignIn"));
const Callback = lazy(() => import("./auth/Callback"));
const GoogleCallback = lazy(() => import("./auth/GoogleCallback"));
const KakaoCallback = lazy(() => import("./auth/KakaoCallback"));
const SignUp = lazy(() => import("./pages/SignUp"));
const EmailSignUp = lazy(() => import("./pages/SignUp/EmailSignUp"));
const OAuthSignUpForm = lazy(() => import("./pages/SignUp/OAuthSignUpForm"));
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
const TrackAction = lazy(() => import("./pages/CreateTrack/TrackAction"));
const TrackReview = lazy(() => import("./pages/CreateTrack/TrackReview"));
const ManageTracks = lazy(() => import("./pages/Management/Tracks"));
const ManageComments = lazy(() => import("./pages/Management/Comments"));
const loadingPlaceHolder = (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}
  >
    Data is loading...
  </div>
);
export const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={loadingPlaceHolder}>
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/auth/Callback" element={<Callback />} />
          <Route path="auth/google/callback" element={<GoogleCallback />} />
          <Route path="auth/kakao/callback" element={<KakaoCallback />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="SignUp/EmailSignUp" element={<EmailSignUp />} />
          <Route path="SignUp/OAuthSignUpForm" element={<OAuthSignUpForm />} />
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
            <Route path="CreateTrack/TrackAction" element={<TrackAction />} />
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
