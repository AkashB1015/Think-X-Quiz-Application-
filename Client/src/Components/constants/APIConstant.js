
export const API_PORT = "5656";

export const API_BASE_URL = `http://localhost:${API_PORT}`;

export const AUTH_API_URL = `${API_BASE_URL}/login`;             
export const REGISTER_API_URL = `${API_BASE_URL}/registerUser`;  
export const CONTACT_API_URL = `${API_BASE_URL}/addContact`;     

export const ADMIN_API = {

  SUBJECTS: `${API_BASE_URL}/admin/subject`,
  QUIZZES: `${API_BASE_URL}/admin/quiz`,
  QUESTIONS: `${API_BASE_URL}/admin/question`,
  USERS: `${API_BASE_URL}/users`,

};

export const STUDENT_API = {

  QUIZZES: `${API_BASE_URL}/student/quizzes`,
  QUIZ_DETAIL: (quizId) => `${API_BASE_URL}/student/quiz/${quizId}`,
  SUBMIT_QUIZ: `${API_BASE_URL}/student/quiz/submit`,
  
};

export const STORAGE_KEYS = {
  TOKEN: "token",
  ROLE: "role",
  USER: "user",
};
