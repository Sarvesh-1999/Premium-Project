import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateUser from "./CreateUser";
import AllUsers from "./AllUsers";
import EditUser from "./EditUser";
import Navbar from "./Navbar";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<CreateUser />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/edit-user/:id" element={<EditUser />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
