import {
    createBrowserRouter,
    RouterProvider,
    Outlet,
    createRoutesFromElements,
    Route,
    ScrollRestoration,
} from "react-router-dom";
import SignUp from "./main/account/RegisterForm";
import Home from "./main/home/Home"

// const Layout = () => {
//     return (
//         <div>
//             <Header />
//             <HeaderBottom />
//             <SpecialCase />
//             <ScrollRestoration />
//             <Outlet />
//             <Footer />
//             <FooterBottom />
//         </div>
//     );

// };
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            {/*<Route path="/" element={<Layout />}>*/}
            {/*    /!* ==================== Header Navlink Start here =================== *!/*/}
                <Route index element={<Home />}></Route>
            {/*    <Route path="/shop" element={<Shop />}></Route>*/}
            {/*    <Route path="/about" element={<About />}></Route>*/}
            {/*    <Route path="/contact" element={<Contact />}></Route>*/}
            {/*    <Route path="/journal" element={<Journal />}></Route>*/}
            {/*    /!* ==================== Header Navlink End here ===================== *!/*/}
            {/*    <Route path="/offer" element={<Offer />}></Route>*/}
            {/*    <Route path="/product/:_id" element={<ProductDetails />}></Route>*/}
            {/*    <Route path="/cart" element={<Cart />}></Route>*/}
            {/*    <Route path="/paymentgateway" element={<Payment />}></Route>*/}
            {/*</Route>*/}
            <Route path="/signup" element={<SignUp />}></Route>
            {/*<Route path="/signin" element={<SignIn />}></Route>*/}
        </Route>
    )
);

function App() {
    return (
        <div className="font-bodyFont">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
