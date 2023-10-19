import { configureStore } from "@reduxjs/toolkit";
import axios from "axios";

// This IP address is the IP address of my computer on my local network.
// You will need to change this to the IP address of your computer on your local network.
// You can find this by running `ipconfig` in the command prompt on Windows or `ifconfig` in the terminal on Mac.
const API_URL = "http://192.168.1.133";

const initialState = {
    jobs: [],
    currentJobId: null,
};

const vacancyReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_JOBS":
            return { ...state, jobs: action.payload };
        case "ADD_JOB":
            return { ...state, jobs: [action.payload, ...state.jobs] };
        case "UPDATE_JOB":
            return {
                ...state,
                jobs: state.jobs.map((job) =>
                    job.id === action.payload.id ? action.payload : job
                ),
            };
        case "REMOVE_JOB":
            return {
                ...state,
                jobs: state.jobs.filter((job) => job.id !== action.payload),
            };
        case "SET_CURRENT_JOB_ID":
            return { ...state, currentJobId: action.payload };
        default:
            return state;
    }
};

const store = configureStore({
    reducer: vacancyReducer,
});

export const setJobs = (jobs) => ({
    type: "SET_JOBS",
    payload: jobs,
});

export const addJob = (job) => ({
    type: "ADD_JOB",
    payload: job,
});

export const updateJob = (job) => ({
    type: "UPDATE_JOB",
    payload: job,
});

export const removeJob = (id) => ({
    type: "REMOVE_JOB",
    payload: id,
});

export const setCurrentJobId = (id) => ({
    type: "SET_CURRENT_JOB_ID",
    payload: id,
});

export const fetchJobs = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${API_URL}/api/v1/vacancies`);
            dispatch(setJobs(response.data));
        } catch (error) {
            console.error(error);
        }
    };
};
export const deleteJob = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.delete(
                `${API_URL}/api/v1/vacancies/${id}`
            );
            dispatch(removeJob(id));
        } catch (error) {
            console.error(error);
        }
    };
};
export const editJob = (job) => {
    return async (dispatch) => {
        try {
            const response = await axios.put(
                `${API_URL}/api/v1/vacancies/${job.id}`,
                job
            );
            dispatch(updateJob(job));
        } catch (error) {
            console.error(error);
        }
    };
};
export const createJob = (job) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(
                `${API_URL}/api/v1/vacancies`,
                job
            );
            dispatch(addJob(response.data));
            return response.data;
        } catch (error) {
            console.error(error);
        }
    };
};

export default store;
