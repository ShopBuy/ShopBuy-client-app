import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Outlet} from "react-router-dom";
import SignUp from "./main/account/RegisterForm";
import Home from "./main/home/Home"
import Header from "./components/home/Header/Header";
import Footer from "./components/home/Footer/Footer";
import FooterBottom from "./components/home/Footer/FooterBottom";
import Shop from "./pages/Shop/Shop";
import Login from "./pages/Account/Login";
<<<<<<< HEAD
import Profile from "./pages/Account/Profile";
import PasswordProfile from "./pages/Account/PasswordProfile";
import EditProfile from "./pages/Account/EditProfile";
=======
import Search from "./components/home/Header/search/Search";
>>>>>>> 6d3e0bc05172609e501b5da7ba001ebdcc551ee9

const Layout = () => {
    return (
        <div>
            <Header/>
            <Outlet/>
            <Footer/>
            <FooterBottom/>
        </div>
    );
};
const router = createBrowserRouter(
<<<<<<< HEAD
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout/>}>
        <Route path="/shop" element={<Shop />}></Route>

        <Route index element={<Home/>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/password-profile" element={<PasswordProfile />}></Route>
        <Route path="/edit-profile" element={<EditProfile />}></Route>
      </Route>
    </Route>
  )
=======
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<Layout/>}>
                <Route path="/shop" element={<Shop/>}></Route>
                <Route index element={<Home/>}></Route>
                <Route path="/signup" element={<SignUp/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
                {/*<Route path="/search" element={<Search/>}></Route>*/}
            </Route>
        </Route>
    )
>>>>>>> 6d3e0bc05172609e501b5da7ba001ebdcc551ee9
);

function App() {
    return (
        <div className="font-bodyFont">
            <RouterProvider router={router}/>
        </div>
    );
}

export default App;
