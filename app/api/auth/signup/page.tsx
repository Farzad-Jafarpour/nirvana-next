"use client";
import Navbar from "@/app/components/Navbar";
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
import { useRouter } from "next/navigation";
import React, { useState } from "react";

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
    paddingRight: "16px", // Ensure the placeholder text has 16px padding on the right
    bg: colorPalette.third,
    "&::placeholder": {
      opacity: 0.6,
      color: "black",
    },
  },
  fileInput: {
    display: "none",
  },
  fileInputLabel: {
    display: "inline-block",
    padding: "8px 12px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    cursor: "pointer",
  },
  selectOptions: {
    background: "#38B2AC",
  },
  itemContainer: {
    width: "100%",
  },
  item: {
    margin: "5px",
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
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
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
                sx={styles.passwordInput} // Use a separate style for the password input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </InputGroup>
            {error && <FormErrorMessage>{error}</FormErrorMessage>}
          </FormControl>

          <Button sx={styles.btn} type="submit">
            ثبت نام
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default LoginForm;
