import React from "react";
import { AuthProvider } from "./auth/AuthContextProvider";


interface AppProvidersProps {

    children: React.ReactNode
}

const ProviderComposer: React.FC<{
  providers: Array<React.JSXElementConstructor<React.PropsWithChildren<any>>>;
  children: React.ReactNode;
}> = ({ providers, children }) => {
  return providers.reduceRight((acc, Provider) => {
    return <Provider>{acc}</Provider>;
  }, children);
};


const AppProviders: React.FC<AppProvidersProps> = ({children}) => {

    const providers = [
        AuthProvider
    ]
    return (
    <ProviderComposer providers={providers}>
      {children}
    </ProviderComposer>
  );
}



export default AppProviders;