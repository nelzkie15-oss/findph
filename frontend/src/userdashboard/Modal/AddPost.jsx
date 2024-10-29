import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddPost() {
  const API_URL = "http://127.0.0.1:8000/api";
  // const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    file: null,
    price: "",
    link: "",
  });

  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setFormData((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    } else if (name === "title") {
      // Allow only alphabetic characters
      const alphabeticValue = value.replace(/[^a-zA-Z\s]/g, "");
      setFormData((prevState) => ({
        ...prevState,
        [name]: alphabeticValue,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.title) formErrors.title = "Title is required";
    if (!formData.description)
      formErrors.description = "Description is required";
    if (!formData.file) formErrors.file = "Upload Image is required";
    if (!formData.price) formErrors.price = "Price is required";
    if (!formData.link) formErrors.link = "Link is required";
    return formErrors;
  };

  const handlePost = async (e) => {
    e.preventDefault();
    // setLoading(true);

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    const data = new FormData();
    const token_id = localStorage.getItem("user_id");
    data.append("user_id", token_id);
    data.append("title", formData.title);
    data.append("description", formData.description);
    if (formData.file) {
      data.append("file", formData.file);
    }
    data.append("price", formData.price);
    data.append("link", formData.link);

    await axios
      .post(`${API_URL}/posts`, data)
      .then((response) => {
        toast.success("Insert post successfully");
        setTimeout(() => {
          window.location.href = "/post";
        }, 1500);
        setMessage(response.data.message);
        // setLoading(true);
      })
      .catch((error) => {
        message(error);
      });
  };

  return (
    <>
      <ToastContainer />
      <div
        className="modal fade"
        id="addpostModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                New Post
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handlePost}>
              <div className="modal-body">
                <div className="mb-2">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.title ? "is-invalid" : ""
                    }`}
                    id="title"
                    name="title"
                    onChange={handleChange}
                  />
                  {errors.title && (
                    <p className="text-danger">{errors.title}</p>
                  )}
                </div>

                <div className="mb-2">
                  <label htmlFor="Image" className="form-label">
                    Image
                  </label>
                  <input
                    type="file"
                    className={`form-control ${
                      errors.file ? "is-invalid" : ""
                    }`}
                    id="file"
                    name="file"
                    accept=".png, .jpg, .JPEG"
                    onChange={handleChange}
                  />
                  {errors.file && <p className="text-danger">{errors.file}</p>}
                </div>

                <div className="mb-2">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    type="text"
                    className={`form-control ${
                      errors.description ? "is-invalid" : ""
                    }`}
                    id="description"
                    name="description"
                    onChange={handleChange}
                  ></textarea>
                  {errors.description && (
                    <p className="text-danger">{errors.description}</p>
                  )}
                </div>
                <div className="mb-2">
                  <label htmlFor="price" className="form-label">
                    Price
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.price ? "is-invalid" : ""
                    }`}
                    id="price"
                    name="price"
                    onChange={handleChange}
                  />
                  {errors.price && (
                    <p className="text-danger">{errors.price}</p>
                  )}
                </div>

                <div className="mb-2">
                  <label htmlFor="link" className="form-label">
                    Link
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.link ? "is-invalid" : ""
                    }`}
                    id="link"
                    name="link"
                    onChange={handleChange}
                  />
                  {errors.link && <p className="text-danger">{errors.link}</p>}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
