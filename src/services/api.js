import axios from "axios";
import { API_CONFIG } from "../constants/constants";
import { tokenManager } from "../utils/tokenManager";

// Set default axios config for credentials
axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  withCredentials: true, // Enable credentials for all requests
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = tokenManager.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Handle token from login/register responses
    if (response.data.token) {
      tokenManager.setToken(response.data.token);
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      tokenManager.removeToken();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const authService = {
  register: async (userData) => {
    const response = await api.post("/signup", userData);
    return response.data;
  },

  login: async (idToken) => {
    return api.post("/auth/login", null, {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });
  },

  completeProfileStep: async (stepId, stepData) => {
    const token = tokenManager.getToken();
    return api.post(
      "/steps/complete-profile-step",
      {
        stepId,
        stepData,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },

  verifyEmail: async (token) => {
    const response = await api.post("/verify-email", { token });
    return response.data;
  },

  googleSignIn: async (userData) => {
    const response = await api.post("/googleSignIn", userData);
    if (response.data.token) {
      tokenManager.setToken(response.data.token);
    }
    return response;
  },
  logout: () => {
    tokenManager.removeToken();
    window.location.href = "/login";
  },
};

export const borrowerService = {
  getAvailableLenders: () => api.get("/borrower/lenders"),
  updateBorrowerProfile: (data) => api.put("/borrower/update-profile", data),
  getBorrowerProfile: (data) => api.put("/borrower/get-profile", data),
  applyForLoan: (data) => api.post("/borrower/apply", data),
  getBorrowerLoans: () => api.get("/borrower/loans"),
  makePayment: (data) => api.post("/borrower/payment", data),
  updateApplication: (data) => api.put("/borrower/update-application", data),
};

export const documentService = {
  uploadDocument: (file, loanId, documentType) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("loanId", loanId);
    formData.append("documentType", documentType);
    return api.post("/documents/upload", formData);
  },
  validateDocument: (documentId, data) =>
    api.post(`/documents/${documentId}/validate`, data),
  getDocumentsByLoan: (loanId) => api.get(`/documents/loan/${loanId}`),
  getPendingDocuments: (lenderId) => api.get(`/documents/pending/${lenderId}`),
};

export const loanApprovalService = {
  getLoanDetails: (loanId) => api.get(`/loans/${loanId}`),
  validateDocuments: (data) =>
    api.post("/loan-approval/validate-documents", data),
  approveLoan: (data) => api.post("/loan-approval/approve", data),
  uploadLoanDocuments: (data) =>
    api.post("/loan-approval/upload-documents", data),
  rejectLoan: (data) => api.post("/loan-approval/reject", data),
};

export const analyticsService = {
  getLenderDashboard: () => api.get("/analytics/lender/dashboard"),
  getBorrowerDashboard: () => api.get("/analytics/borrower/dashboard"),
  getPaymentAnalytics: () => api.get("/analytics/borrower/payments"),
};

export const reportingService = {
  getLenderReport: () => api.get("/reporting/lender"),
  getBorrowerReport: () => api.get("/reporting/borrower"),
};

export const taskService = {
  getTasksByRole: (lenderId) => api.get(`/tasks/${lenderId}`),
  updateTaskStatus: (taskId, data) => api.patch(`/tasks/${taskId}`, data),
};

export const taskWorkflowService = {
  progressTask: (taskId, data) =>
    api.post(`/task-workflow/progress/${taskId}`, data),
  reassignTask: (taskId, data) =>
    api.post(`/task-workflow/reassign/${taskId}`, data),
  getWorkflowStatus: (loanId) => api.get(`/task-workflow/status/${loanId}`),
};

export const lenderService = {
  configureLoanTerms: (data) => api.post("/lender/loan-terms/configure", data),
  getLoanTermsHistory: (data) => api.post("/lender/loan-terms/history", data),
  getLenderProfile: () => api.get("/lender/profile"),
  getTeamActivity: () => api.get("/lender/team-activity"),
  getDashboardData: () => api.get("/lender/metrics"),
  getActiveLoans: () => api.get("/lender/loans/active-loans"),
  updateLenderProfile: (data) => api.put("/lender/update-profile", data),
};

export const performanceService = {
  getLoanPerformance: (loanId) => api.get(`/performance/loans/${loanId}`),
  getPortfolioPerformance: () => api.get("/performance/portfolio"),
  getLenderPerformance: (lenderId) =>
    api.get(`/performance/lenders/${lenderId}`),
};

export const stepService = {
  completeProfileStep: (data) => api.get(`/steps/complete-step`, data),
};
