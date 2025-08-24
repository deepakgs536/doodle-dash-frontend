// store/authStore.ts
import { create } from "zustand";
import axios from "axios";
import { showToast } from "@/components/toastComp";
import { Navigate, useNavigate } from "react-router";

interface SignInData {
  email: string;
  password: string;
}

interface SignUpData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface User {
  id: string;
  email: string;
  username: string;
}

interface AuthState {
  // states
  signInData: SignInData;
  signUpData: SignUpData;
  user: User | null;
  accessToken: string | null;

  // handlers
  handleSignInChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSignUpChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  // resets
  resetSignInData: () => void;
  resetSignUpData: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  // initial states
  signInData: { email: "", password: "" },
  signUpData: { username: "", email: "", password: "", confirmPassword: "" },
  user: null,
  accessToken: null,

  // input handlers
  handleSignInChange: (e) => {
    const { name, value } = e.target;
    set((state) => ({
      signInData: { ...state.signInData, [name]: value },
    }));
  },

  handleSignUpChange: (e) => {
    const { name, value } = e.target;
    set((state) => ({
      signUpData: { ...state.signUpData, [name]: value },
    }));
  },

  // reset handlers
  resetSignInData: () => set({ signInData: { email: "", password: "" } }),
  resetSignUpData: () =>
    set({ signUpData: { username: "", email: "", password: "", confirmPassword: "" } }),
}));

