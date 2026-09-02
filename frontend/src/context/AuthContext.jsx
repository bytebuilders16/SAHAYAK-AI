import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('sahayak_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [userProfile, setUserProfile] = useState(() => {
    try {
      const stored = localStorage.getItem('sahayak_profile');
      return stored ? JSON.parse(stored) : {
        age: 20,
        state: "Uttar Pradesh",
        annual_income: 250000,
        occupation: "Student",
        student_status: true,
        category: "General",
        gender: "Male",
        residence: "Urban",
        farmer_status: false,
        healthcare_req: false,
        housing_req: false,
        education_req: true
      };
    } catch {
      return null;
    }
  });

  const [savedSchemes, setSavedSchemes] = useState(() => {
    try {
      const stored = localStorage.getItem('sahayak_saved');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('sahayak_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('sahayak_user');
    }
  }, [user]);

  useEffect(() => {
    if (userProfile) {
      localStorage.setItem('sahayak_profile', JSON.stringify(userProfile));
    }
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem('sahayak_saved', JSON.stringify(savedSchemes));
  }, [savedSchemes]);

  const loginWithDemoOtp = (phone, otp) => {
    if (otp === "123456") {
      const newUser = {
        name: "Aakash Sharma",
        phone: phone || "9876543210",
        state: "Uttar Pradesh",
        isDemo: true,
        loginTime: new Date().toISOString()
      };
      setUser(newUser);
      return { success: true };
    }
    return { success: false, message: "Invalid demo OTP. Please use: 123456" };
  };

  const logout = () => {
    setUser(null);
  };

  const toggleSaveScheme = (schemeId) => {
    setSavedSchemes(prev => {
      if (prev.includes(schemeId)) {
        return prev.filter(id => id !== schemeId);
      } else {
        return [...prev, schemeId];
      }
    });
  };

  return (
    <AuthContext.Provider value={{
      user,
      userProfile,
      setUserProfile,
      loginWithDemoOtp,
      logout,
      savedSchemes,
      toggleSaveScheme
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
