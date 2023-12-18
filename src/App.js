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

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
                <Route index element={<Home />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
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
