import { AxiosDefault } from "../../plugins/axios";

export const DashboardService = {
    getTeachers() {
        return AxiosDefault.get("/api/teacher");
    },
    createTeacher(payload) {
        return AxiosDefault.post("/api/teacher", payload);
    },
    updateTeacher(id, payload) {
        return AxiosDefault.put("/api/teacher/" + id, payload);
    },
    deleteTeacher(id) {
        return AxiosDefault.delete("/api/teacher/" + id);
    }
};
