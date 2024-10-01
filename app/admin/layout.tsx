// app/admin/layout.tsx
"use client";
import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar"; // Adjust the path if necessary
import { jwtDecode } from "jwt-decode"; // Ensure this package is installed

const styles = {
  container: {
    position: "fixed",
    right: "0",
    left: "0",
    zIndex: "1000",
  },
  content: {
    position: "absolute",
    top: "82px",
    width: "100%",
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

// Change the function name to start with an uppercase letter
const Layout: React.FC<RootLayoutProps> = ({ children }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/api/auth/login");
    } else {
      try {
        const decoded: any = jwtDecode(token);
        if (!decoded.isAdmin) {
          router.push("/api/auth/login");
        }
      } catch (error) {
        router.push("/api/auth/login");
      } finally {
        setIsLoading(false); // End loading state after checks
      }
    }
  }, [router]);

  // Show nothing or a loading state while checking auth
  if (isLoading) {
    return <div>Loading...</div>; // Show loading state while checking auth
  }

  return (
    <Box>
      <Box sx={styles.container}>
        <Navbar />
      </Box>
      <Box sx={styles.content} dir="rtl">
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
