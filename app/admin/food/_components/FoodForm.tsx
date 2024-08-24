"use client";

import { BaseUrl, colorPalette } from "@/assets/constants";
import { useMenuItems } from "@/hooks/useSections";
import { axiosInstance } from "@/services/apiClient";
import { MenuItemType } from "@/types/menu";
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
import { useState } from "react";
import { useForm } from "react-hook-form";

type FoodFormType = MenuItemType & {
  image?: FileList;
};

const valueAsBoolean = (value: string) => value === "true";

export default function FoodForm({ food }: { food?: FoodFormType }) {
  const router = useRouter();
  const { data: foodData } = useMenuItems();

  const [sectionId, setSectionId] = useState(0);

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FoodFormType>({});

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

  const onSubmit = handleSubmit(async (data: FoodFormType) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("price", String(data.price));
    formData.append("hasExtra", String(data.hasExtra));
    formData.append("isAvailable", String(data.isAvailable));
    formData.append("isNew", String(data.isNew));
    formData.append("isLarge", String(data.isLarge));
    formData.append("isTax", String(data.isTax));
    formData.append("isEnable", String(data.isEnable));
    formData.append("sectionId", String(sectionId));

    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    }

    try {
      if (food) {
        await axiosInstance.patch(`menu/${food.id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        await axiosInstance.post("menu", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
      router.push("/admin/food");
    } catch (error) {
      console.error("Failed to submit form data:", error);
    }
  });

  return (
    <Box sx={styles.container}>
      <form onSubmit={onSubmit}>
        <VStack spacing={4}>
          <Flex sx={styles.itemContainer}>
            <Box sx={styles.item}>
              <FormControl isInvalid={!!errors.title}>
                <FormLabel sx={styles.labels} htmlFor="price">
                  نام غذا
                </FormLabel>
                <Input
                  id="title"
                  placeholder="نام غذا"
                  sx={styles.inputs}
                  defaultValue={food?.title}
                  {...register("title", {
                    required: "نام غذا را وارد کنید",
                  })}
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
                  defaultValue={food?.price}
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
              <FormControl isInvalid={!!errors.hasExtra}>
                <FormLabel sx={styles.labels} htmlFor="hasExtra">
                  آیتم افزودنی
                </FormLabel>
                <Select
                  id="hasExtra"
                  placeholder="وضعیت آیتم اضافه را انتخاب کنید"
                  defaultValue={`${food?.hasExtra}`}
                  {...register("hasExtra", {
                    setValueAs: valueAsBoolean,
                  })}
                >
                  <option style={styles.selectOptions} value="true">
                    آیتم افزودنی دارد
                  </option>
                  <option style={styles.selectOptions} value="false">
                    آیتم افزودنی ندارد
                  </option>
                </Select>
                <FormErrorMessage>
                  {errors.hasExtra && errors.hasExtra.message}
                </FormErrorMessage>
              </FormControl>
            </Box>
            <Box sx={styles.item}>
              <FormControl isInvalid={!!errors.isTax}>
                <FormLabel sx={styles.labels} htmlFor="isTax">
                  شامل مالیات میشود؟
                </FormLabel>
                <Select
                  id="isTax"
                  placeholder="وضعیت مالیات را انتخاب کنید"
                  defaultValue={`${food?.isTax}`}
                  {...register("isTax", {
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
                  {errors.isTax && errors.isTax.message}
                </FormErrorMessage>
              </FormControl>
            </Box>
          </Flex>

          <Flex sx={styles.itemContainer}>
            <Box sx={styles.item}>
              <FormControl isInvalid={!!errors.isAvailable}>
                <FormLabel sx={styles.labels} htmlFor="isAvailable">
                  وضعیت غذا
                </FormLabel>
                <Select
                  id="isAvailable"
                  placeholder="وضعیت غذا را انتخاب کنید"
                  defaultValue={`${food?.isAvailable}`}
                  {...register("isAvailable", {
                    setValueAs: valueAsBoolean,
                  })}
                >
                  <option style={styles.selectOptions} value="true">
                    آماده است
                  </option>
                  <option style={styles.selectOptions} value="false">
                    آماده نیست
                  </option>
                </Select>
                <FormErrorMessage>
                  {errors.isAvailable && errors.isAvailable.message}
                </FormErrorMessage>
              </FormControl>
            </Box>
            <Box sx={styles.item}>
              <FormControl isInvalid={!!errors.isNew}>
                <FormLabel sx={styles.labels} htmlFor="isNew">
                  وضعیت جدید بودن غذا
                </FormLabel>
                <Select
                  id="isNew"
                  placeholder="وضعیت جدید بودن غذا را انتخاب کنید"
                  defaultValue={`${food?.isNew}`}
                  {...register("isNew", {
                    setValueAs: valueAsBoolean,
                  })}
                >
                  <option style={styles.selectOptions} value="true">
                    جدید است
                  </option>
                  <option style={styles.selectOptions} value="false">
                    جدید نیست
                  </option>
                </Select>
                <FormErrorMessage>
                  {errors.isNew && errors.isNew.message}
                </FormErrorMessage>
              </FormControl>
            </Box>
            <Box sx={styles.item}>
              <FormControl isInvalid={!!errors.isEnable}>
                <FormLabel sx={styles.labels} htmlFor="isEnable">
                  آیا غذا فعال است؟
                </FormLabel>
                <Select
                  id="isEnable"
                  placeholder="وضعیت فعال بودن را انتخاب کنید"
                  defaultValue={`${food?.isEnable}`}
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
              <FormControl isInvalid={!!errors.isLarge}>
                <FormLabel sx={styles.labels} htmlFor="isLarge">
                  وضعیت بزرگ بودن آیتم
                </FormLabel>
                <Select
                  id="isLarge"
                  placeholder="وضعیت بزرگ بودن آیتم را انتخاب کنید"
                  defaultValue={`${food?.isLarge}`}
                  {...register("isLarge", {
                    setValueAs: valueAsBoolean,
                  })}
                >
                  <option style={styles.selectOptions} value="true">
                    بزرگ است
                  </option>
                  <option style={styles.selectOptions} value="false">
                    بزرگ نیست
                  </option>
                </Select>
                <FormErrorMessage>
                  {errors.isLarge && errors.isLarge.message}
                </FormErrorMessage>
              </FormControl>
            </Box>
            {!food && (
              <Box sx={styles.item}>
                <FormControl>
                  <FormLabel sx={styles.labels} htmlFor="category">
                    دسته بندی
                  </FormLabel>
                  <Select
                    id="category"
                    placeholder="دسته بندی را انتخاب کنید"
                    value={sectionId}
                    onChange={(e) => setSectionId(Number(e.target.value))}
                    required
                  >
                    {foodData?.map((section) => (
                      <option
                        key={section.id}
                        style={styles.selectOptions}
                        value={section.id}
                      >
                        {section.title}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            )}
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
              {...register("image", {})}
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
}
