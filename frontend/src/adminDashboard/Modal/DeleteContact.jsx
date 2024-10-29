import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DeleteContact({ id }) {
  const [post, setPost] = useState({
    title: "",
  });

  const token = localStorage.getItem("token");
  const [setErrors] = useState({});

  useEffect(() => {
    if (id) {
      axios.get(`/api/contacts/${id}`).then((response) => {
        setPost(response.data);
      });
    }
  }, [id]);

  async function handleDeletePost(e) {
    e.preventDefault();

    const res = await fetch(`/api/contacts/${id}`, {
      method: "delete",
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
      toast.success("Delete Contact successfully");
      setTimeout(() => {
        window.location.href = "/contact";
      }, 1500);
    }
  }

  return (
    <>
      <ToastContainer />
      <div
        className="modal fade"
        id="deletecontactModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-sm">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Delete Contact
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleDeletePost}>
              <div className="modal-body">
                <center>
                  <span className="text-zinc-600 text-left hover:text-center">
                    {post.full_name}
                  </span>
                </center>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button className="btn btn-primary btn-sm">Delete</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
