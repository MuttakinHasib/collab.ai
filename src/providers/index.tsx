import { ReactQueryProvider } from "./react-query";

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
};
