import { create } from "zustand";
import { IAttendance, IUser } from "../lib/types";

interface Variables {
  from: string;
  to: string;
  filterValue: string;
  filterCriteria: string;
  page: number;
  size: number;
  setTo: (page: string) => void;
  setFrom: (size: string) => void;
  setPage: (page: number) => void;
  setSize: (size: number) => void;
  setFilterValue: (filterValue: string) => void;
  setFilterCriteria: (filterCriteria: string) => void;
  reset: () => void;
}

const defaultState = {
  from: "",
  to: "",
  page: 1,
  size: 10,
  filterCriteria: "Name",
  filterValue: "",
};

export const useVariables = create<Variables>((set) => ({
  ...defaultState,
  setFrom: (from) => set(() => ({ from })),
  setTo: (to) => set(() => ({ to })),
  setPage: (page) => set(() => ({ page })),
  setSize: (size) => set(() => ({ size })),
  setFilterValue: (filterValue) => set(() => ({ filterValue })),
  setFilterCriteria: (filterCriteria) => set(() => ({ filterCriteria })),
  reset: () => set(() => ({ ...defaultState })),
}));

interface AttendanceState {
  students: IAttendance[];
  setStudents: (data: IAttendance[]) => void;
}

export const useAttendance = create<AttendanceState>((set) => ({
  students: [],
  setStudents: (data) => set({ students: data }),
}));

type AuthState = {
  credentials: {
    accessToken: string;
    refreshToken: string;
    user: IUser;
  } | null;
  setCredentials: (
    accessToken: string,
    refreshToken: string,
    user: IUser
  ) => void;
  logout: () => void;
  initializeAuth: () => void;
};

// Helper function to get stored auth data
const getStoredAuth = () => {
  if (typeof window === "undefined") return null;

  try {
    const accessToken = sessionStorage.getItem("accessToken");
    const refreshToken = sessionStorage.getItem("refreshToken");
    const userData = sessionStorage.getItem("user");

    if (accessToken && refreshToken && userData) {
      return {
        accessToken,
        refreshToken,
        user: JSON.parse(userData),
      };
    }
  } catch (error) {
    console.error("Error parsing stored auth data:", error);
  }

  return null;
};

export const userAuth = create<AuthState>((set) => ({
  credentials: null,

  setCredentials: (accessToken, refreshToken, user) => {
    // Store in sessionStorage
    sessionStorage.setItem("accessToken", accessToken);
    sessionStorage.setItem("refreshToken", refreshToken);
    sessionStorage.setItem("userData", JSON.stringify(user));

    // Update state
    set(() => ({
      credentials: { accessToken, refreshToken, user },
    }));
  },

  logout: () => {
    // Clear sessionStorage
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    sessionStorage.removeItem("userData");

    // Clear state
    set(() => ({ credentials: null }));
  },

  initializeAuth: () => {
    const storedAuth = getStoredAuth();
    if (storedAuth) {
      set(() => ({ credentials: storedAuth }));
    }
  },
}));
