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
  FormErrorMessage,
  Spacer,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const styles = {
  container: {
    w: "100%",
    p: "5px",
    bg: colorPalette.primary,
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
    display: "flex",
    flexDirection: { base: "column", sm: "row" },
    justifyContent: "center",
    alignItems: "center",
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

type Inputs = {
  category: string;
  price: number;
  title: string;
};

const ExtraForm = ({ extra }: { extra?: ExtraType }) => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");

  // const onSubmit = async (e: React.FormEvent) => {
  //   // e.preventDefault();
  //   // const data = { title, price, category };
  //   // if (extra)
  //   //   await axiosInstance
  //   //     .patch(`extra/${extra.id}`, data)
  //   //     .then((res) => res.data);
  //   // else await axiosInstance.post("extra", data).then((res) => res.data);
  //   // router.push("/admin/extra");
  // };

  const onSubmit = handleSubmit(async (data: Inputs) => {
    if (extra)
      await axiosInstance
        .patch(`extra/${extra.id}`, data)
        .then((res) => res.data);
    else await axiosInstance.post("extra", data).then((res) => res.data);
    router.push("/admin/extra");
  });

  return (
    <form onSubmit={onSubmit}>
      <VStack spacing={4}>
        <Flex sx={styles.itemContainer}>
          <Box sx={styles.item}>
            <FormControl isInvalid={!!errors.title}>
              <FormLabel sx={styles.labels} htmlFor="title">
                عنوان
              </FormLabel>
              <Input
                id="title"
                placeholder="عنوان"
                sx={styles.inputs}
                {...register("title", { required: "عنوان را وارد کنید" })}
              />
              <FormErrorMessage>
                {errors.title && errors.title.message}
              </FormErrorMessage>
            </FormControl>
          </Box>
          <Spacer />
          <Box sx={styles.item}>
            <FormControl isInvalid={!!errors.price}>
              <FormLabel sx={styles.labels} htmlFor="price">
                قیمت
              </FormLabel>
              <Input
                id="price"
                placeholder="قیمت"
                sx={styles.inputs}
                {...register("price", {
                  required: "قیمت را وارد کنید",
                  valueAsNumber: true,
                  validate: (value) => !isNaN(value) || "قیمت باید عدد باشد",
                })}
              />
              <FormErrorMessage>
                {errors.price && errors.price.message}
              </FormErrorMessage>
            </FormControl>
          </Box>
          <Spacer />
          <Box sx={styles.item}>
            <FormControl isInvalid={!!errors.category}>
              <FormLabel sx={styles.labels} htmlFor="category">
                دسته بندی
              </FormLabel>
              <Select
                id="category"
                placeholder="دسته بندی را انتخاب کنید"
                {...register("category", {
                  required: "دسته بندی را وارد کنید",
                })}
              >
                <option value="food">غذا</option>
                <option value="cold">سرد</option>
                <option value="hot">گرم</option>
                <option value="breakfast">صبحانه</option>
              </Select>
              <FormErrorMessage>
                {errors.category && errors.category.message}
              </FormErrorMessage>
            </FormControl>
          </Box>
        </Flex>

        <Box sx={styles.btnContainer}>
          <Button
            width="60px"
            bg={colorPalette.third}
            type="submit"
            isLoading={isSubmitting}
          >
            ارسال
          </Button>
          <Spacer />
          <Button
            width="60px"
            bg={colorPalette.contrast}
            onClick={() => {
              router.push("/admin/extra");
            }}
          >
            لغو
          </Button>
        </Box>
      </VStack>
    </form>
  );
};

export default ExtraForm;
