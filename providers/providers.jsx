import ReduxProvider from "@/providers/reduxProvider";
import QueryProvider from "@/providers/queryClientProvider";
import ThemeProvider from "@/providers/themeProvider";
import AuthProvider from "@/providers/authProvider";
import AntdStyleProvider from "./antdStyleProvider";

const AppProviders = ({ children }) => {
  return (
    <ReduxProvider>
      <QueryProvider>
        <AntdStyleProvider>
          <ThemeProvider>
            <AuthProvider>{children}</AuthProvider>
          </ThemeProvider>
        </AntdStyleProvider>
      </QueryProvider>
    </ReduxProvider>
  );
};

export default AppProviders;
