"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { colorPalette } from "@/assets/constants";
import { axiosInstance } from "@/services/apiClient";
import { ExtraItemType } from "@/types/extra";
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

const valueAsBoolean = (value: string) => value === "true";

type Inputs = {
  category: string;
  price: number;
  title: string;
  isEnable: string;
};

const ExtraForm = ({ extra }: { extra?: ExtraItemType }) => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  const onSubmit = handleSubmit(async (data: Inputs) => {
    const payload = {
      title: data.title,
      price: data.price,
      category: data.category,
      isEnable: data.isEnable, // Ensure boolean type
    };

    if (extra) {
      await axiosInstance
        .patch(`extra/${extra.id}`, payload)
        .then((res) => res.data);
    } else {
      await axiosInstance.post("extra", payload).then((res) => res.data);
    }
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
                defaultValue={extra?.title}
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
                defaultValue={extra?.price}
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
        </Flex>
        <Flex sx={styles.itemContainer}>
          <Box sx={styles.item}>
            <FormControl isInvalid={!!errors.isEnable}>
              <FormLabel sx={styles.labels} htmlFor="isEnable">
                وضعیت موجود بودن آیتم
              </FormLabel>
              <Select
                id="isEnable"
                placeholder="وضعیت موجود بودن آیتم را انتخاب کنید"
                defaultValue={`${extra?.isEnable}`}
                {...register("isEnable", {
                  setValueAs: valueAsBoolean,
                })}
              >
                <option style={styles.selectOptions} value="true">
                  موجود است
                </option>
                <option style={styles.selectOptions} value="false">
                  موجود نیست
                </option>
              </Select>

              <FormErrorMessage>
                {errors.isEnable && errors.isEnable.message}
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
                defaultValue={extra?.category}
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
            ذخیره
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
