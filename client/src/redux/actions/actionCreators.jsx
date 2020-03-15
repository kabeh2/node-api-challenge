import { actionTypes } from "./";

export const fetchRequest = () => ({
  type: actionTypes.FETCH_REQUEST
});

export const fetchSuccess = projects => ({
  type: actionTypes.FETCH_SUCCESS,
  payload: projects
});

export const fetchError = error => ({
  type: actionTypes.FETCH_ERROR,
  payload: error
});

export const getProjects = id => ({
  type: actionTypes.GET_PROJECTS,
  payload: id
});

export const deleteProject = (id, projects) => ({
  type: actionTypes.DELETE_PROJECT,
  payload: {
    id,
    projects
  }
});

export const addProject = project => ({
  type: actionTypes.ADD_PROJECT,
  payload: project
});

export const updateProject = (id, project) => ({
  type: actionTypes.UPDATE_PROJECT,
  payload: {
    id,
    project
  }
});
