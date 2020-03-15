import React, { useEffect } from "react";
import { useRouteMatch } from "react-router";
import { connect } from "react-redux";
import { Col, Row } from "react-bootstrap";
import { getProjects } from "../redux/actions";
import ProjectCard from "../components/ProjectCard";
import ProjectDetails from "./ProjectDetails";
import AbsoluteWrapper from "../components/AbsoluteWrapper";

function Home({ projects, getProjects }) {
  const match = useRouteMatch();

  useEffect(() => {
    getProjects(match.params.id);
  }, [getProjects, match]);

  return (
    <AbsoluteWrapper>
      {projects ? (
        <Row className="justify-content-around">
          {projects.map(project => (
            <Col md={12} key={project.id}>
              <ProjectCard projects={project} allProjects={projects} />
              {project.actions && (
                <>
                  {project.actions.length > 0 && <h3>Project Details</h3>}
                  {project.actions.map((action, index) => (
                    <ProjectDetails
                      action={action}
                      index={index}
                      key={action.id}
                    />
                  ))}
                </>
              )}
            </Col>
          ))}
        </Row>
      ) : (
        <h1>Loading...</h1>
      )}
    </AbsoluteWrapper>
  );
}

const mapStateToProps = ({ fetchReducer: { projects } }) => ({
  projects
});

const mapDispatchToProps = dispatch => ({
  getProjects: id => dispatch(getProjects(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
