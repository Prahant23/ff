import React, { useEffect, useState } from "react";
import { createProductApi, deleteProductAPI, getAllProductsAPI } from "../../apis/Api";
import { toast } from "react-toastify";
const Admindashboard = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCategory, setProductCategory] = useState("");

  const [productImage, setProductImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleImage = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setProductImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const [products, setProducts] = useState([]);
  useEffect(() => {
    getAllProductsAPI().then((res) => {
      setProducts(res.data.products);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productImage", productImage);
    formData.append("productName", productName);
    formData.append("productDescription", productDescription);
    formData.append("productcategory", productCategory);
    formData.append("productPrice", productPrice);
    formData.append("previewimage", previewImage);
    formData.append("Products", products);


    createProductApi(formData)
      .then((res) => {
        if (res.data.success == false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Internal Server Error!");
      });
  };

  const handleDelete = (id) => {
    const confirm = window.confirm("Delete this product?");
    if (!confirm) {
      return;
    } else {
      deleteProductAPI(id).then((res) => {
        if (res.data.success == false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          window.location.reload();
        }
      });
    }
  };
  return (
    <>
      <div className="m-4">
        <div className="d-flex justify-content-between">
          <h1>Admin Dashbard</h1>
          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Add Product
          </button>
          <div
            className="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Create Product
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  {/* Name, Description , price , Catagory(Select), Image */}
                  <label>Product Name</label>
                  <input
                    onChange={(e) => {
                      setProductName(e.target.value);
                    }}
                    className="form-control"
                    type="text"
                    name=""
                    id=""
                    placeholder="Enter product name"
                  />
                  <label>Product Description</label>
                  <textarea
                    onChange={(e) => {
                      setProductDescription(e.target.value);
                    }}
                    className="form-control"
                    cols={4}
                    rows={4}
                    name=""
                    id=""
                    placeholder={"Enter product description"}
                  />
                  <label>Product Price</label>
                  <input
                    onChange={(e) => {
                      setProductPrice(e.target.value);
                    }}
                    className="form-control"
                    type="number"
                    name=""
                    id=""
                    placeholder="Enter product price"
                  />
                  <label>Product Catagory</label>
                  <select
                    onChange={(e) => {
                      setProductCategory(e.target.value);
                    }}
                    className="form-control"
                    name=""
                    id=""
                  >
                    <option value="">Select Catagory</option>
                    <option value="clothes">Clothes</option>
                    <option value="shoes">Shoes</option>
                    <option value="accessories">Accessories</option>
                  </select>
                  <label>Product Image</label>
                  <input
                    onChange={handleImage}
                    className="form-control"
                    type="file"
                    name=""
                    id=""
                  />
                  previewImage &&{" "}
                  <img
                    src="previewImage"
                    className="img-fluid rounded object-cover mt-2"
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 
      make table
       */}
        <table className="table mt-2">
          <thead className="table-dark">
            <tr>
              <th scope="col">Product Image</th>
              <th scope="col">Product Name</th>
              <th scope="col">Product Price</th>
              <th scope="col">Product Description</th>
              <th scope="col">Product Category</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <img
                  src="https://th.bing.com/th?id=OIP.KeRduNXcbnI6lIpUsQzq3gHaFj&w=288&h=216&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
                  alt=""
                  height={100}
                  width={80}
                />
              </td>
              <td>Pog</td>
              <td>$1M</td>
              <td>Pog</td>
              <td>Pop smoke</td>
              <td>
                <div
                  className="btn-group"
                  role="group"
                  aria-label="Basic example"
                >
                  <button type="button" className="btn btn-success">
                    Edit
                  </button>
                  <button type="button" className="btn btn-danger" onClick={handleDelete}>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Admindashboard;
  