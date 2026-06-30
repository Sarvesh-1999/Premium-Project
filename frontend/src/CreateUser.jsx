import { useState } from "react";
import axios from "axios";

const CreateUser = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreateUser = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/v1/create-user", formData)
      .then(() => {
        alert("User Created");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return <div></div>;
};
export default CreateUser;
