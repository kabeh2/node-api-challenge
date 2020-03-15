import React from "react";
import { useField } from "formik";
import { Form } from "react-bootstrap";

const MyTextInput = ({ textArea, label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <div style={{ marginBottom: "16px" }}>
      <label htmlFor={props.id || props.name}>{label}</label>
      {textArea ? (
        <Form.Control as="textarea" rows="3" {...field} {...props} />
      ) : (
        <Form.Control {...field} {...props} />
      )}

      {meta.touched && meta.error ? (
        <Form.Text className="error" style={{ color: "red" }}>
          {meta.error}
        </Form.Text>
      ) : null}
    </div>
  );
};

export default MyTextInput;
