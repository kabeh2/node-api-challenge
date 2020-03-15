import React from "react";
import { Card } from "react-bootstrap";

function ProjectDetails({ action, index }) {
  return (
    <Card className="mb-4">
      <Card.Header className="d-flex justify-content-between align-items-center">
        {`Project Details ${index + 1} - ${action.description}`}
      </Card.Header>
      {action && (
        <Card.Body>
          <blockquote className="blockquote mb-0">
            <p>{action.notes}</p>
          </blockquote>
        </Card.Body>
      )}
    </Card>
  );
}

export default ProjectDetails;
