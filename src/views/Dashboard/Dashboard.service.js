import { AxiosDefault } from "../../plugins/axios";

export const DashboardService = {
    /** Teacher */
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
    },

    /** Course */
    getCourse() {
        return AxiosDefault.get("/api/course").then(res =>
            res.code ? [] : res.body
        );
    },
    createCourse(payload) {
        return AxiosDefault.post("/api/course", payload);
    },
    updateCourse(id, payload) {
        return AxiosDefault.put("/api/course/" + id, payload);
    },
    deleteCourse(id) {
        return AxiosDefault.delete("/api/course/" + id);
    },

    /** Posts */
    getPosts() {
        return AxiosDefault.get("/api/post").then(res =>
            res.code ? [] : res.body
        );
    },
    createPost(payload) {
        return AxiosDefault.post("/api/post", payload);
    },
    updatePost(id, payload) {
        return AxiosDefault.put("/api/post/" + id, payload);
    },
    deletePost(id) {
        return AxiosDefault.delete("/api/post/" + id);
    },
    /** Users */
    getUsers(roles) {
        return AxiosDefault.get("/api/user").then(res => {
            if (res.code) {
                return [];
            }
            return res.body.filter(item => roles.includes(item.role));
        });
    },

    setUserRole(id, role) {
        return AxiosDefault.post("/api/user/role", {
            id,
            role
        });
    },

    getUserCourse(id) {
        return AxiosDefault.get(`/api/user/${id}/course`).then(
            res => res.body || []
        );
    },

    setUserCourse(userId, courseId, grade) {
        return AxiosDefault.put(`/api/user/${userId}/course`, {
            courseId,
            grade: grade || 0
        });
    },
    removeUserCourse(userId, courseId) {
        return AxiosDefault.delete(`/api/user/${userId}/course/${courseId}`);
    }
};
