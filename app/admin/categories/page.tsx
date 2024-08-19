"use client";
import { colorPalette } from "@/assets/constants";
import { axiosInstance } from "@/services/apiClient";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Spacer,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const styles = {
  container: {
    w: "100%",
    p: "5px",
    bg: colorPalette.primary,
    borderRadius: "5px",
    boxShadow: "md",
    color: "black",
  },
  labels: {
    margin: "5px",
  },
  inputs: {
    bg: colorPalette.third,
    "&::placeholder": {
      opacity: 1,
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
    borderRadius: "4px",
    cursor: "pointer",
  },
  selectOptions: {
    background: "#38B2AC",
  },
  itemContainer: {
    width: "100%",
  },
  item: {
    width: "100%",
    margin: "5px",
  },
  btnContainer: {
    display: "flex",
    width: "150px",
    margin: "5px",
    padding: "5px",
    direction: "row",
  },
};

export default function CategoryForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = await axiosInstance
      .post("section", {
        title: title,
        category: category,
        icon: "icon",
      })
      .then((res) => res.data);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/auth/login");
  }, [router]);

  return (
    <Box sx={styles.container}>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <Flex sx={styles.itemContainer}>
            <Box sx={styles.item}>
              <FormControl>
                <FormLabel sx={styles.labels} htmlFor="title">
                  عنوان
                </FormLabel>
                <Input
                  id="title"
                  placeholder="عنوان"
                  sx={styles.inputs}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </FormControl>
            </Box>
            <Spacer />
            <Box sx={styles.item}>
              <FormControl>
                <FormLabel sx={styles.labels} htmlFor="category">
                  دسته بندی
                </FormLabel>
                <Select
                  id="category"
                  placeholder="دسته بندی را انتخاب کنید"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option style={styles.selectOptions} value="food">
                    غذا
                  </option>
                  <option style={styles.selectOptions} value="cold">
                    سرد
                  </option>
                  <option style={styles.selectOptions} value="hot">
                    گرم
                  </option>
                  <option style={styles.selectOptions} value="breakfast">
                    صبحانه
                  </option>
                </Select>
              </FormControl>
            </Box>
          </Flex>

          <Box sx={styles.btnContainer}>
            <Button width="60px" bg={colorPalette.third} type="submit">
              ارسال
            </Button>
            <Spacer />
            <Button
              width="60px"
              bg={colorPalette.contrast}
              onClick={() => {
                router.push("/admin/food");
              }}
            >
              لغو
            </Button>
          </Box>
        </VStack>
      </form>
    </Box>
  );
}
