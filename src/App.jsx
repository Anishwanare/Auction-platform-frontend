import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SideDrawer from './layout/SideDrawer';
import { ToastContainer } from 'react-toastify';
import Spinner from '@/custom-components/Spinner';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminProfile, fetchLeaderboard, fetchProfile } from './store/slices/userSlice';
import { getAllAuctionItems } from './store/slices/auctionSlice';


// Lazy load components
const Home = lazy(() => import('./pages/Home'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Register = lazy(() => import('./pages/Register'));
const Login = lazy(() => import('./pages/Login'));
const SendCommissionProof = lazy(() => import('./pages/SendCommissionProof'));
const HowItWorks = lazy(() => import('./pages/HowItWorks'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const Contact = lazy(() => import('./pages/Contact'));
const LeaderBoardPage = lazy(() => import('./pages/LeaderBoardPage'));
const AuctionItems = lazy(() => import('./pages/AuctionItems'));
const AuctionItemDetail = lazy(() => import('./pages/AuctionItemDetail'));
const AuctioneerAuctionItemDetail = lazy(() => import('./pages/AuctioneerAuctionItemDetail'));
const MyAuction = lazy(() => import('./pages/MyAuction'));
const CreateAuction = lazy(() => import('./pages/CreateAuction'));
const AdminDashboard = lazy(() => import('./pages/Admin/AdminDashboard'));
const Messages = (() => import('./pages/Admin/Messages'));
const Bidders = (() => import('./pages/Admin/Bidders'));
const Auctioneers = (() => import('./pages/Admin/Auctioneers'));
const PaymentsProofs = (() => import('./pages/Admin/PaymentsProofs'));
const Profile = (() => import('./pages/Profile'));

const App = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.User);

  console.log("app js ", user)

  console.log("isAutheticated", isAuthenticated);






  useEffect(() => {
    dispatch(fetchAdminProfile());
    dispatch(fetchProfile());
    dispatch(getAllAuctionItems());
    dispatch(fetchLeaderboard());
  }, [dispatch]);

  return (
    <Router>
      <ToastContainer position="top-right" draggable />
      <SideDrawer />
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-screen">
            <Spinner />
          </div>
        }
      >
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/submit-commission" element={<SendCommissionProof />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />

          {/* User and Bidder Routes */}
          <Route path="/leaderboardpage" element={<LeaderBoardPage />} />
          <Route path="/auction-items" element={<AuctionItems />} />
          <Route path="/auction-items/details/:id" element={<AuctionItemDetail />} />
          <Route path="/my-auction" element={<MyAuction />} />
          <Route path="/create-auction" element={<CreateAuction />} />
          <Route
            path="/auctioneer/auction-items/details/:id"
            element={<AuctioneerAuctionItemDetail />}
          />

          {/* profile router */}
          <Route path='/my-profile/:id' element={<Profile />} />

          {/* Admin Routes */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin-messages" element={<Messages />} />
          <Route path="/admin-bidders" element={<Bidders />} />
          <Route path="/admin/auctioneers" element={<Auctioneers />} />
          <Route path="/payments-proofs" element={<PaymentsProofs />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
