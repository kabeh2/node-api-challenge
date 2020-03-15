import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { deleteProject } from "../redux/actions";

function ProjectCard({ projects, allProjects, deleteProject }) {
  const onDeleteProject = (id, allProjects) => {
    const result = window.confirm(
      "Are you sure you want to delete this project?"
    );
    if (result) {
      deleteProject(id, allProjects);
    }
  };

  return (
    <Card className="mb-4">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <div style={{ flexBasis: "45%" }}>{projects.name}</div>
        {!projects.actions && (
          <div>
            <Link
              to={{
                pathname: `/projects/${projects.id}`
              }}
              className="p-0"
            >
              <Button variant="outline-info">Details</Button>
            </Link>
            <Button
              className="ml-2"
              variant="outline-danger"
              onClick={() => onDeleteProject(projects.id, allProjects)}
            >
              Delete
            </Button>
          </div>
        )}
        {projects.actions && (
          <Link
            to={{
              pathname: `/update/${projects.id}`,
              state: {
                project: allProjects
              }
            }}
            className="p-0"
          >
            <Button variant="outline-info">Update</Button>
          </Link>
        )}
      </Card.Header>
      {projects && (
        <Card.Body>
          <blockquote className="blockquote mb-0">
            <p>{projects.description}</p>
          </blockquote>
        </Card.Body>
      )}
    </Card>
  );
}

const mapDispatchToProps = dispatch => ({
  deleteProject: (id, projects) => dispatch(deleteProject(id, projects))
});

export default connect(null, mapDispatchToProps)(ProjectCard);
