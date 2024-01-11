import React from "react";
import ReactDOM from "react-dom/client";
import { PersistGate } from "redux-persist/integration/react";
import "slick-carousel/slick/slick.css";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import "./index.css";
import App from "./App";
import {GoogleOAuthProvider} from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <GoogleOAuthProvider clientId="888292015768-rbgpdu4t3nelm7rbr1s6loubq4h9uaqf.apps.googleusercontent.com">
                <App />
            </GoogleOAuthProvider>;
        </PersistGate>
    </Provider>
);
