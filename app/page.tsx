import Registrations from "./register/page";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  return (
    <div>
      <Registrations />
      <ToastContainer />
    </div>
  );
}
