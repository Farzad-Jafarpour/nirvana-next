"use client";
import { colorPalette } from "@/assets/constants";
import { axiosInstance } from "@/services/apiClient";
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
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type Inputs = {
  src: FileList;
  title: string;
  isEnable: boolean;
  path: string;
};

const valueAsBoolean = (value: string) => value === "true";

export default function MainItemForm() {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

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
      borderRadius: "5px",
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

  const onSubmit = async (data: Inputs) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("path", data.path);
    formData.append("isEnable", String(data.isEnable));

    if (data.src && data.src[0]) {
      formData.append("image", data.src[0]);
    }

    try {
      const response = await axiosInstance.post("mainItem", formData, {
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
                  sx={styles.inputs}
                  {...register("title", { required: "عنوان را وارد کنید" })}
                />
                <FormErrorMessage>
                  {errors.title && errors.title.message}
                </FormErrorMessage>
              </FormControl>
            </Box>
            <Box sx={styles.item}>
              <FormControl isInvalid={!!errors.title}>
                <FormLabel sx={styles.labels} htmlFor="path">
                  مسیر
                </FormLabel>
                <Input
                  id="path"
                  placeholder="مسیر"
                  sx={styles.inputs}
                  {...register("path", { required: "مسیر را وارد کنید" })}
                />
                <FormErrorMessage>
                  {errors.path && errors.path.message}
                </FormErrorMessage>
              </FormControl>
            </Box>
            <Box sx={styles.item}>
              <FormControl isInvalid={!!errors.isEnable}>
                <FormLabel sx={styles.labels} htmlFor="isEnable">
                  آیا آیتم فعال است؟
                </FormLabel>
                <Select
                  id="isEnable"
                  placeholder="وضعیت فعال بودن را انتخاب کنید"
                  {...register("isEnable", {
                    setValueAs: valueAsBoolean,
                  })}
                >
                  <option style={styles.selectOptions} value="true">
                    بله
                  </option>
                  <option style={styles.selectOptions} value="false">
                    خیر
                  </option>
                </Select>
                <FormErrorMessage>
                  {errors.isEnable && errors.isEnable.message}
                </FormErrorMessage>
              </FormControl>
            </Box>
          </Flex>
          <Flex sx={styles.itemContainer}>
            <Box sx={styles.item}>
              <FormControl isInvalid={!!errors.src}>
                <FormLabel sx={styles.labels} htmlFor="image">
                  تصویر
                </FormLabel>
                <Input
                  id="image"
                  sx={{ padding: "5px" }}
                  type="file"
                  variant="pill"
                  {...register("src")}
                />
                <FormErrorMessage>
                  {errors.src && errors.src.message}
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
              ذخیره
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
