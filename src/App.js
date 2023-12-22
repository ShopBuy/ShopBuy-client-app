import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Outlet} from "react-router-dom";
import SignUp from "./main/account/RegisterForm";
import Home from "./main/home/Home"
import Header from "./components/home/Header/Header";
import Footer from "./components/home/Footer/Footer";
import FooterBottom from "./components/home/Footer/FooterBottom";
import Shop from "./pages/Shop/Shop";
import Login from "./pages/Account/Login";
import Search from "./components/home/Header/search/Search";

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
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<Layout/>}>
                <Route path="/shop" element={<Shop/>}></Route>
                <Route index element={<Home/>}></Route>
                <Route path="/signup" element={<SignUp/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
            </Route>
        </Route>
    )
);

function App() {
    return (
        <div className="font-bodyFont">
            <RouterProvider router={router}/>
        </div>
    );
}

export default App;
