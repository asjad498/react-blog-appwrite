import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function LogoutBtn() {
  const dispatch = useDispatch();
  // const logoutHandler = () => {
  //   authService.logout().then(() => {
  //     dispatch(logout())
  //     .catch((error) => {
  //       console.error("Logout failed:", error)
  //       // Handle the error as needed, e.g., show a message to the user
  //     })
  //   })
  // }

  const logoutHandler = () => {
    authService
      .logout()
      .then(() => {
        dispatch(logout());
      })
      .catch((error) => {
        console.error("Logout failed:", error);
        // Optionally, handle the error here, e.g., show a message to the user
      });
  };

  return (
    // <button className='inline-bock px-6 duration-200 hover:bg-blue-100 rounded-full' onClick={logoutHandler}
    // >Logout</button>

    <button
      className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
