import {createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider} from "react-router-dom";
import SignUp from "./main/account/RegisterForm";
import Home from "./main/home/Home"
import Header from "./components/home/Header/Header";
import Footer from "./components/home/Footer/Footer";
import FooterBottom from "./components/home/Footer/FooterBottom";
import Shop from "./pages/Shop/Shop";
import Login from "./pages/Account/Login";
import Profile from "./pages/Account/Profile";
import PasswordProfile from "./pages/Account/PasswordProfile";
import EditProfile from "./pages/Account/EditProfile";
import ProductDetail from "./pages/product/ProductDetail";
import AdminProductsList from "./dashboard/productAdmin/AdminProductsList";
import UpdateProductPage from "./dashboard/productAdmin/UpdateProductPage";
import AddProductPage from "./dashboard/productAdmin/AddProductPage";
import ShopBuy from "./pages/Shop/ShopBuy";

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
                <Route path="/shop" element={<ShopBuy/>}></Route>
                <Route path="/product/:id" element={<ProductDetail/>}></Route>
                <Route index element={<Home/>}></Route>
                <Route path="/signup" element={<SignUp/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/profile" element={<Profile/>}></Route>
                <Route path="/password-profile" element={<PasswordProfile/>}></Route>
                <Route path="/edit-profile" element={<EditProfile/>}></Route>
                <Route path="/shopbuy" element={<ShopBuy/>}></Route>

            </Route>
            <Route path="/admin" element={<AdminProductsList/>}></Route>
            <Route path="/admin/update/:productId" element={<UpdateProductPage/>}/>
            <Route path="/admin/add" element={<AddProductPage/>}/>
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
