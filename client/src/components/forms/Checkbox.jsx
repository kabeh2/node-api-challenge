import React from "react";
import { useField } from "formik";
import { Form } from "react-bootstrap";

const MyCheckbox = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: "checkbox" });
  return (
    <>
      <Form.Check
        type="checkbox"
        {...field}
        {...props}
        label={children}
        className="mb-3"
      />

      {meta.touched && meta.error ? (
        <Form.Text className="error">{meta.error}</Form.Text>
      ) : null}
    </>
  );
};

export default MyCheckbox;
