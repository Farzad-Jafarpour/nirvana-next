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
  Image,
} from "@chakra-ui/react";
import { useMainItems } from "@/hooks/useMainItems";
import Loading from "@/app/components/Loading";

type Inputs = {
  category: string;
  image: FileList;
  title: string;
  order: number;
};

type SectionType = {
  id: number;
  category: string;
  icon: string; // Image URL or path
  title: string;
  order: number;
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

const CategoryForm = ({ section }: { section: SectionType }) => {
  const router = useRouter();
  const { data: mainItems, error, isLoading } = useMainItems();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  const onSubmit = async (data: Inputs) => {
    const formData = new FormData();
    formData.append("category", data.category);
    formData.append("title", data.title);
    formData.append("order", data.order.toString());

    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
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

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Box sx={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          {/* Display Category Image */}
          <Flex justifyContent="center" mb={4}>
            {section.icon && (
              <Image
                src={section.icon} // Category image URL
                alt={section.title}
                boxSize="120px"
                objectFit="cover"
                borderRadius="10px"
                boxShadow="md"
              />
            )}
          </Flex>

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
                  defaultValue={`${section?.category}`}
                  {...register("category", {
                    required: "دسته بندی را وارد کنید",
                  })}
                >
                  {mainItems?.map((item) => (
                    <option key={item.title} value={item.title}>
                      {item.title}
                    </option>
                  ))}
                </Select>
                <FormErrorMessage>
                  {errors.category && errors.category.message}
                </FormErrorMessage>
              </FormControl>
            </Box>
          </Flex>
          <Flex sx={styles.itemContainer}>
            <Box sx={styles.item}>
              <FormControl isInvalid={!!errors.order}>
                <FormLabel sx={styles.labels} htmlFor="order">
                  اولویت نمایش
                </FormLabel>
                <Input
                  id="order"
                  placeholder="اولویت نمایش"
                  defaultValue={section?.order}
                  sx={styles.inputs}
                  {...register("order", { required: "اولویت را وارد کنید" })}
                />
                <FormErrorMessage>
                  {errors.order && errors.order.message}
                </FormErrorMessage>
              </FormControl>
            </Box>
            <Spacer />
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
};

export default CategoryForm;
