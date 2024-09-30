"use client";
import { colorPalette } from "@/assets/constants";
import { axiosInstance } from "@/services/apiClient";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Spacer,
  VStack,
} from "@chakra-ui/react";

type Inputs = {
  category: string;
  image: FileList;
  title: string;
};

type SectionType = {
  id: number;
  category: string;
  icon: string;
  title: string;
};

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

const CategoryForm = ({ section }: { section: SectionType }) => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  const onSubmit = async (data: Inputs) => {
    const formData = new FormData();
    formData.append("category", data.category);
    formData.append("title", data.title);

    if (data.image && data.image[0]) {
      formData.append("icon", data.image[0]);
    }

    try {
      await axiosInstance.patch(`section/${section.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      router.push("/admin/food");
    } catch (error) {
      console.error("Failed to submit form data:", error);
    }
  };
  return (
    <Box sx={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
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
                  defaultValue={section?.title}
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
              <FormControl isInvalid={!!errors.category}>
                <FormLabel sx={styles.labels} htmlFor="category">
                  دسته بندی
                </FormLabel>
                <Select
                  id="category"
                  placeholder="دسته بندی را انتخاب کنید"
                  defaultValue={section?.category}
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

          <FormControl isInvalid={!!errors.image}>
            <FormLabel sx={styles.labels} htmlFor="image">
              تصویر
            </FormLabel>
            <Input
              id="image"
              sx={{ padding: "5px" }}
              type="file"
              variant="pill"
              {...register("image")}
            />
            <FormErrorMessage>
              {errors.image && errors.image.message}
            </FormErrorMessage>
          </FormControl>
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
};

export default CategoryForm;
