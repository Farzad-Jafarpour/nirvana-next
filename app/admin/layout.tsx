// app/admin/layout.tsx
"use client";
import { Box, Spinner, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar"; // Adjust the path if necessary
import { jwtDecode } from "jwt-decode"; // Ensure this package is installed
import Loading from "../components/Loading";

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
  loadingContainer: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column", // Set direction to column to stack spinner and text
    justifyContent: "center",
    alignItems: "center",
    height: "100vh", // Full height to center the spinner
    textAlign: "center", // Center text
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

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

  // Show spinner and loading message while checking auth
  if (isLoading) {
    return <Loading />;
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
