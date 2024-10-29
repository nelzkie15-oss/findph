import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function AddContact() {
  const API_URL = "http://127.0.0.1:8000/api";
  // const [loading, setLoading] = useState(false);
  const [editorData, setEditorData] = useState("");
  const [formData, setFormData] = useState({
    profile: null,
    full_name: "",
    contact_number: "",
    email: "",
    address: "",
    age: "",
    jobs: "",
  });

  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profile") {
      setFormData((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    } else if (name === "full_name") {
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
    if (!editorData) {
      formErrors.skill = "Skill is required";
    }
    if (!formData.profile) formErrors.profile = "Upload Profile is required";
    if (!formData.full_name) formErrors.full_name = "Full Name is required";
    if (!formData.contact_number)
      formErrors.contact_number = "Contact Number is required";
    if (!formData.email) formErrors.email = "Email is required";
    if (!formData.address) formErrors.address = "Address is required";
    if (!formData.age) formErrors.age = "Age is required";
    // if (!formData.skill) formErrors.skill = "Skill is required";
    if (!formData.jobs) formErrors.jobs = "Job is required";
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
    // content: editorData
    const token_id = localStorage.getItem("user_id");
    data.append("user_id", token_id);
    if (formData.profile) {
      data.append("profile", formData.profile);
    }
    data.append("profile", formData.profile);
    data.append("full_name", formData.full_name);
    data.append("contact_number", formData.contact_number);
    data.append("email", formData.email);
    data.append("address", formData.address);
    data.append("age", formData.age);
    data.append("skill", editorData);
    data.append("website_link", formData.website_link);
    data.append("socialmedia_link", formData.socialmedia_link);
    data.append("jobs", formData.jobs);

    await axios
      .post(`${API_URL}/contacts`, data)
      .then((response) => {
        toast.success("Insert contact successfully");
        setTimeout(() => {
          window.location.href = "/contact";
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
        id="addcontactModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                New Contact
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
                  <label htmlFor="profile" className="form-label">
                    Profile
                  </label>
                  <input
                    type="file"
                    className={`form-control ${
                      errors.profile ? "is-invalid" : ""
                    }`}
                    id="profile"
                    name="profile"
                    accept=".png, .jpg, .JPEG"
                    onChange={handleChange}
                  />
                  {errors.profile && (
                    <p className="text-danger">{errors.profile}</p>
                  )}
                </div>

                <div className="mb-2">
                  <label htmlFor="full_name" className="form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.full_name ? "is-invalid" : ""
                    }`}
                    id="full_name"
                    name="full_name"
                    onChange={handleChange}
                  />
                  {errors.full_name && (
                    <p className="text-danger">{errors.full_name}</p>
                  )}
                </div>

                <div className="row">
                  <div className="col-lg-6">
                    <div className="mb-2">
                      <label htmlFor="contactnumber" className="form-label">
                        Contact Number
                      </label>
                      <input
                        type="text"
                        className={`form-control ${
                          errors.contact_number ? "is-invalid" : ""
                        }`}
                        id="contact_number"
                        name="contact_number"
                        onChange={handleChange}
                      />
                      {errors.contact_number && (
                        <p className="text-danger">{errors.contact_number}</p>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="mb-2">
                      <label htmlFor="email" className="form-label">
                        Email Address
                      </label>
                      <input
                        type="text"
                        className={`form-control ${
                          errors.email ? "is-invalid" : ""
                        }`}
                        id="email"
                        name="email"
                        onChange={handleChange}
                      />
                      {errors.email && (
                        <p className="text-danger">{errors.email}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mb-2">
                  <label htmlFor="address" className="form-label">
                    Complete Address
                  </label>
                  <textarea
                    rows={3}
                    type="text"
                    className={`form-control ${
                      errors.address ? "is-invalid" : ""
                    }`}
                    id="address"
                    name="address"
                    onChange={handleChange}
                  ></textarea>
                  {errors.address && (
                    <p className="text-danger">{errors.address}</p>
                  )}
                </div>

                <div className="row">
                  <div className="col-lg-6">
                    <div className="mb-2">
                      <label htmlFor="age" className="form-label">
                        Age
                      </label>
                      <input
                        type="text"
                        className={`form-control ${
                          errors.age ? "is-invalid" : ""
                        }`}
                        id="age"
                        name="age"
                        onChange={handleChange}
                      />
                      {errors.age && (
                        <p className="text-danger">{errors.age}</p>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="mb-2">
                      <label htmlFor="jobs" className="form-label">
                        Jobs
                      </label>
                      <input
                        type="text"
                        className={`form-control ${
                          errors.jobs ? "is-invalid" : ""
                        }`}
                        id="jobs"
                        name="jobs"
                        onChange={handleChange}
                      />
                      {errors.jobs && (
                        <p className="text-danger">{errors.jobs}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mb-2">
                  <label htmlFor="skill" className="form-label">
                    Your Skill
                  </label>
                  <CKEditor
                    id="skill"
                    name="skill"
                    editor={ClassicEditor}
                    data={editorData}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setEditorData(data);
                    }}
                  />
                  {errors.skill && (
                    <p className="text-danger">{errors.skill}</p>
                  )}
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="mb-2">
                      <label htmlFor="website_link" className="form-label">
                        Website link
                      </label>
                      <input
                        type="text"
                        className={`form-control ${
                          errors.website_link ? "is-invalid" : "is-valid"
                        }`}
                        id="website_link"
                        name="website_link"
                        onChange={handleChange}
                      />
                      {errors.website_link && (
                        <p className="text-danger">{errors.website_link}</p>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="mb-2">
                      <label htmlFor="socialmedia_link" className="form-label">
                        Social media link
                      </label>
                      <input
                        type="text"
                        className={`form-control ${
                          errors.socialmedia_link ? "is-invalid" : "is-valid"
                        }`}
                        id="socialmedia_link"
                        name="socialmedia_link"
                        onChange={handleChange}
                      />
                      {errors.socialmedia_link && (
                        <p className="text-danger">{errors.socialmedia_link}</p>
                      )}
                    </div>
                  </div>
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
