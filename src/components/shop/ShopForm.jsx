import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../../store/AuthProvider";

export default function ShopForm() {
  const authContext = useAuth();
  const user = authContext.user;
  const saveDataToFirebase = async (data) => {
    try {
      const shopsCollection = collection(db, "shops");
      await addDoc(shopsCollection, { ...data, userUid: user.uid });
      formik.resetForm();
      toast.success("Shop data saved successfully.");
    } catch (error) {
      toast.error("Failed to save shop data.");
      console.error("Error saving shop data:", error);
    }
  };

  const initialValues = {
    shopName: "",
    town: "",
    startYear: "",
    description: "",
    imageUrl: "",
    price: 0,
    saleOnSale: false,
  };

  const validationSchema = Yup.object({
    shopName: Yup.string()
      .min(4, "Shop name must be at least 4 characters")
      .required("Shop name is required"),
    town: Yup.string()
      .min(4, "Town must be at least 4 characters")
      .required("Town is required"),
    startYear: Yup.number()
      .min(1970, "Start year must be after 1970")
      .max(2025, "Start year must be before 2025")
      .required("Start year is required"),
    description: Yup.string()
      .min(6, "Description must be at least 6 characters")
      .required("Description is required"),
    imageUrl: Yup.string()
      .min(5, "Image URL must be at least 5 characters")
      .required("Image URL is required"),
    price: Yup.number()
      .min(0, "Price cannot be negative")
      .required("Price is required"),
    saleOnSale: Yup.boolean(),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (formik.isValid) {
        saveDataToFirebase(values);
      }
    },
  });

  return (
    <div className="mt-16 bg-gray-700 shadow-md rounded px-8 pt-6 pb-8 mb-8 text-white">
      <div>
        <Toaster />
      </div>
      <form onSubmit={formik.handleSubmit} className="mb-4">
        <div className="mb-4">
          <label
            htmlFor="shopName"
            className="block text-white-700 text-sm font-bold mb-2"
          >
            Shop Name:
          </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.shopName}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="shopName"
            name="shopName"
            placeholder="Shop Name"
          />
          {formik.errors.shopName && formik.touched.shopName && (
            <p className="text-red-500 text-xs italic">
              {formik.errors.shopName}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="town"
            className="block text-white-700 text-sm font-bold mb-2"
          >
            Town:
          </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.town}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="town"
            name="town"
            placeholder="Town"
          />
          {formik.errors.town && formik.touched.town && (
            <p className="text-red-500 text-xs italic">{formik.errors.town}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="startYear"
            className="block text-white-700 text-sm font-bold mb-2"
          >
            Start Year:
          </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.startYear}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            id="startYear"
            name="startYear"
            placeholder="Start Year"
          />
          {formik.errors.startYear && formik.touched.startYear && (
            <p className="text-red-500 text-xs italic">
              {formik.errors.startYear}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-white-700 text-sm font-bold mb-2"
          >
            Description:
          </label>
          <textarea
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="description"
            name="description"
            placeholder="Description"
          />
          {formik.errors.description && formik.touched.description && (
            <p className="text-red-500 text-xs italic">
              {formik.errors.description}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="imageUrl"
            className="block text-white-700 text-sm font-bold mb-2"
          >
            Image URL:
          </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.imageUrl}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="imageUrl"
            name="imageUrl"
            placeholder="Image URL"
          />
          {formik.errors.imageUrl && formik.touched.imageUrl && (
            <p className="text-red-500 text-xs italic">
              {formik.errors.imageUrl}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-white-700 text-sm font-bold mb-2"
          >
            Price:
          </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.price}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            id="price"
            name="price"
            placeholder="Price"
          />
          {formik.errors.price && formik.touched.price && (
            <p className="text-red-500 text-xs italic">{formik.errors.price}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="saleOnSale"
            className="block text-white-700 text-sm font-bold mb-2"
          >
            On Sale ?:
          </label>
          <select
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.saleOnSale}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="saleOnSale"
            name="saleOnSale"
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
          {formik.errors.saleOnSale && formik.touched.saleOnSale && (
            <p className="text-red-500 text-xs italic">
              {formik.errors.saleOnSale}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
