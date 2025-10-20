import { useContext } from "react";
import { AuthContext, IAuthContext } from "./AuthContext";


export const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
