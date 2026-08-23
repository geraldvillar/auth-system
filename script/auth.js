//AUTH SCRIPT

// Get all users (TODO: Replace with GET /api/users)
export const getUsers = () => {
    return JSON.parse(localStorage.getItem("users")) || []; 
    
};

// Save users list (TODO: Replace with POST /api/register)
export const saveUsers = (users) => {
    localStorage.setItem("users", JSON.stringify(users));
};

// Save current session (TODO: Handle via HttpOnly Cookies / JWT)
export const setCurrentUser = (user) => {
    localStorage.setItem("currentUser", JSON.stringify(user));
};

// Get current user (TODO: Replace with GET /api/auth/me)
export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("currentUser"));
};