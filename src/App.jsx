import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import "./App.css";
import authService from "./appwrite/auth";

import { Header, Footer } from "./components";
import { login, logout } from "./store/authSlice";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => {
        console.error("Error fetching current user:", error);
      })
      .finally(() => setLoading(false));
      // Here Use .catch() //
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-500">
      <div className="w-full block">
        <Header />
        <main>
          {/* Todo: <Outlet/> */}
          <Outlet/>
        </main>
        <Footer />
      </div>
    </div>
  ) : null;

  // return (
  //   <>
  //     <h1> React Blog | Appwrite </h1>
  //   </>
  // )
}

export default App;
