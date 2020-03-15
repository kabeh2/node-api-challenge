import React from "react";
import { connect } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextInput from "./TextInput";
import Checkbox from "./Checkbox";
import { Button } from "react-bootstrap";
import { addProject, updateProject } from "../../redux/actions";

const ProjectForm = ({ addProject, updateProject }) => {
  const history = useHistory();
  const location = useLocation();

  return (
    <>
      <Formik
        initialValues={{
          name: location.state ? location.state.project[0].name : "",
          description: location.state
            ? location.state.project[0].description
            : "",
          completed: location.state
            ? location.state.project[0].completed
            : false
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Required"),
          description: Yup.string().required("Required"),
          completed: Yup.boolean()
        })}
        onSubmit={async (values, { setErrors, setStatus, resetForm }) => {
          try {
            if (location.state) {
              await updateProject(location.state.project[0].id, values);
            } else {
              await addProject(values);
            }
            resetForm({});
            setStatus({ success: true });
            history.replace("/");
          } catch (error) {
            setStatus({ success: false });
            setErrors({ submit: error.message });
          }
        }}
      >
        <Form>
          {location.state ? <h3>Update Project</h3> : <h3>Add Project</h3>}
          <TextInput
            label="Name"
            name="name"
            type="text"
            placeholder="Write name here..."
          />
          <TextInput
            label="Description"
            name="description"
            type="text"
            placeholder="Write description here..."
            textArea
          />
          <Checkbox name="completed">Is this project completed?</Checkbox>

          <Button
            variant="outline-danger"
            type="button"
            className="mr-2"
            onClick={() => {
              const confirmed = window.confirm(
                "Are you sure you want to cancel?"
              );
              if (confirmed) {
                history.goBack();
              }
            }}
          >
            Cancel
          </Button>
          <Button variant="outline-info" type="submit">
            Submit
          </Button>
        </Form>
      </Formik>
    </>
  );
};

const mapDispatchToProps = dispatch => ({
  addProject: project => dispatch(addProject(project)),
  updateProject: (id, project) => dispatch(updateProject(id, project))
});

export default connect(null, mapDispatchToProps)(ProjectForm);
