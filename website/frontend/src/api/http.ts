import axios from "axios";

// reusable axios instance for clean http communication
const http = axios.create({
    baseURL: "http://localhost:3001/api",
    headers: {
        "Content-Type": "application/json",
    },
});

// simple interceptor to demonstrate senior-level patterns
http.interceptors.response.use(
    (res) => res,
    (err) => {
        const message =
            err.response?.data?.message ||
            err.message ||
            "Unexpected server error";

        return Promise.reject(new Error(message));
    }
);

export default http;
