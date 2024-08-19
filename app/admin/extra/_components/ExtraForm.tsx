"use client";
import { colorPalette } from "@/assets/constants";
import { axiosInstance } from "@/services/apiClient";
import { ExtraType } from "@/types/extra";
import {
  VStack,
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const styles = {
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
};

const ExtraForm = ({ extra }: { extra?: ExtraType }) => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = { title, price, category };
    if (extra)
      await axiosInstance
        .patch(`extra/${extra.id}`, data)
        .then((res) => res.data);
    else await axiosInstance.post("extra", data).then((res) => res.data);
    router.push("/admin/extra");
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4}>
        <Flex sx={styles.itemContainer}>
          <Box sx={styles.item}>
            <FormControl>
              <FormLabel sx={styles.labels} htmlFor="price">
                نام غذا
              </FormLabel>
              <Input
                id="title"
                placeholder="نام افزودنی"
                sx={styles.inputs}
                defaultValue={extra?.title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </FormControl>
          </Box>
          <Box sx={styles.item}>
            <FormControl>
              <FormLabel sx={styles.labels} htmlFor="price">
                قیمت
              </FormLabel>
              <Input
                id="price"
                placeholder="قیمت"
                sx={styles.inputs}
                defaultValue={extra?.price}
                onChange={(e) => setPrice(Number(e.target.value))}
                required
              />
            </FormControl>
          </Box>
        </Flex>

        <Flex sx={styles.itemContainer}>
          <Box sx={styles.item}>
            <FormControl>
              <FormLabel sx={styles.labels} htmlFor="details">
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
                <option style={styles.selectOptions} value="breakfast">
                  صبحانه
                </option>
                <option style={styles.selectOptions} value="cold">
                  سرد
                </option>
                <option style={styles.selectOptions} value="hot">
                  گرم
                </option>
              </Select>
            </FormControl>
          </Box>
        </Flex>

        <Button bg={colorPalette.third} type="submit">
          ارسال
        </Button>
      </VStack>
    </form>
  );
};

export default ExtraForm;
