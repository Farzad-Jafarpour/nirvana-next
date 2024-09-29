"use client";
import React, { useState } from "react";
import { colorPalette } from "@/assets/constants";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import Navbar from "@/app/components/Navbar";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode"; // To decode JWT token and extract user info
import useUserStore from "../store/store";

const styles = {
  container: {
    w: "100%",
    h: "100vh",
    p: "16px",
    bg: colorPalette.primary,
    borderRadius: "5px",
    boxShadow: "md",
    color: "black",
  },
  labels: {
    margin: "5px",
    color: colorPalette.__hover,
  },
  inputs: {
    bg: colorPalette.third,
    "&::placeholder": {
      opacity: 0.6,
      color: "black",
    },
  },
  passwordInput: {
    paddingRight: "16px",
    bg: colorPalette.third,
    "&::placeholder": {
      opacity: 0.6,
      color: "black",
    },
  },
  btn: {
    bg: colorPalette.third,
    color: colorPalette.__hover,
    borderRadius: "5px",
    marginY: "5px",
  },
};

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useUserStore(); // Zustand function to set user in store
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token); // Store the token in local storage

      // Decode JWT token to get user info
      const decoded: any = jwtDecode(data.token);

      // Set the user in Zustand global store
      setUser({
        id: decoded.id,
        username: decoded.username,
        isAdmin: decoded.isAdmin,
      });

      // Redirect to admin page
      router.push("/");
    } else {
      const errorData = await response.json();
      setError(errorData.message);
    }
  };

  return (
    <Box>
      <Navbar />
      <Box sx={styles.container} dir="rtl">
        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel sx={styles.labels} htmlFor="userName">
              نام کاربری
            </FormLabel>
            <Input
              id="userName"
              placeholder="نام کاربری"
              sx={styles.inputs}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </FormControl>

          <FormControl>
            <FormLabel sx={styles.labels} htmlFor="password">
              رمز عبور
            </FormLabel>
            <InputGroup>
              <InputLeftElement width="4.5rem">
                <Button
                  borderRadius="5px"
                  h="1.75rem"
                  onClick={handlePasswordVisibility}
                >
                  {showPassword ? "پنهان" : "نمایش"}
                </Button>
              </InputLeftElement>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="رمز عبور"
                sx={styles.passwordInput}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </InputGroup>
            {error && <FormErrorMessage>{error}</FormErrorMessage>}
          </FormControl>

          <Button sx={styles.btn} type="submit">
            ورود
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default LoginForm;
