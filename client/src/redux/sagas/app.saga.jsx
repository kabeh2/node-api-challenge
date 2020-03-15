import { call, all, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  actionTypes,
  fetchRequest,
  fetchSuccess,
  fetchError
} from "../actions";
import { apiEndpoint } from "../../services/authService";

// fetch get projects
const fetchProjects = async id => {
  const { data } = await axios.get(`${apiEndpoint}/projects/${id ? id : ""}`);
  return data;
};

// worker get projects
function* tryGetProjects(action) {
  try {
    yield put(fetchRequest());
    const data = yield call(fetchProjects, action.payload);
    const id = action.payload;

    let dataArray;

    if (id) {
      dataArray = [data];
    } else {
      dataArray = [...data];
    }

    yield put(fetchSuccess(dataArray));
  } catch (error) {
    console.log("Error: ", error);
    yield put(fetchError(error));
  }
}

// watcher get projects
function* onGetProjects() {
  yield takeLatest(actionTypes.GET_PROJECTS, tryGetProjects);
}

// fetch delete projects
const fetchDeleteProject = async id => {
  const { data } = await axios.delete(`${apiEndpoint}/projects/${id}`);
  return data;
};

// worker delete projects
function* tryDeleteProject(action) {
  const projectsCopy = [...action.payload.projects];
  try {
    yield put(fetchRequest());

    const updatedProjects = [...action.payload.projects].filter(
      project => project.id !== action.payload.id
    );

    // Updating State
    yield put(fetchSuccess(updatedProjects));

    // Updating Server
    yield call(fetchDeleteProject, action.payload.id);
  } catch (error) {
    console.log("Error: ", error);
    // Reverting state changes back
    yield put(fetchSuccess(projectsCopy));
    // Error
    yield put(fetchError(error.response));
  }
}

// watcher delete projects
function* onDeleteProject() {
  yield takeLatest(actionTypes.DELETE_PROJECT, tryDeleteProject);
}

// fetch add project

const fetchAddProject = async project => {
  const { data } = await axios.post(`${apiEndpoint}/projects`, project);
  return data;
};

// worker add project
function* tryAddProject(action) {
  try {
    yield put(fetchRequest());

    yield call(fetchAddProject, action.payload);
  } catch (error) {
    console.log("Error: ", error);
    yield put(fetchError(error));
  }
}

// watcher add project
function* onAddProject() {
  yield takeLatest(actionTypes.ADD_PROJECT, tryAddProject);
}

// fetch update project
const fetchUpdateProject = async (id, project) => {
  const { data } = await axios.put(`${apiEndpoint}/projects/${id}`, project);
  return data;
};

// worker update project
function* tryUpdateProject(action) {
  try {
    yield put(fetchRequest());

    yield call(fetchUpdateProject, action.payload.id, action.payload.project);
  } catch (error) {
    console.log("Error: ", error);
    yield put(fetchError(error));
  }
}

// watcher update project
function* onUpdateProject() {
  yield takeLatest(actionTypes.UPDATE_PROJECT, tryUpdateProject);
}

export default function* appSagas() {
  yield all([
    call(onGetProjects),
    call(onDeleteProject),
    call(onAddProject),
    call(onUpdateProject)
  ]);
}
