import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditPost({ id }) {
  const [post, setPost] = useState({
    title: "",
    description: "",
    file: "",
    price: "",
    link: "",
  });

  const token = localStorage.getItem("token");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id) {
      axios.get(`/api/posts/${id}`).then((response) => {
        setPost(response.data);
      });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  async function handleUpdatePost(e) {
    e.preventDefault();

    const res = await fetch(`/api/posts/${id}`, {
      method: "put",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(post),
    });

    const data = await res.json();
    console.log(data);

    if (data.errors) {
      setErrors(data.errors);
    } else {
      toast.success("Updated post successfully");
      setTimeout(() => {
        window.location.href = "/post";
      }, 1500);
    }
  }

  return (
    <>
      <ToastContainer />
      <div
        className="modal fade"
        id="editpostModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Post
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleUpdatePost}>
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
                    value={post.title}
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
                  <img
                    src={`http://127.0.0.1:8000/storage/uploads/${post.file}`}
                    className="object-none object-center bg-yellow-300 w-24 h-24 ..."
                    onChange={handleChange}
                    height={100}
                    width={100}
                    id="file"
                    name="file"
                  />
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
                    value={post.description}
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
                    value={post.price}
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
                    value={post.link}
                    onChange={handleChange}
                  />
                  {errors.link && <p className="text-danger">{errors.link}</p>}
                </div>
              </div>

              <input
                type="hidden"
                className={`form-control`}
                id="user_id"
                name="user_id"
                value={post.user_id}
                onChange={handleChange}
              />

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
