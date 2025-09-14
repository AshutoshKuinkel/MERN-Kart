import { FormProvider, useForm } from "react-hook-form";
import Input from "../../common/inputs/input";
import TextArea from "../../common/inputs/text-area";
import Button from "../../common/inputs/button";
import { yupResolver } from "@hookform/resolvers/yup";
import { categorySchema } from "../../../schema/category.schema";
import type { ICategoryData } from "../../../types/category.types";
import { useMutation } from "@tanstack/react-query";
import { postCategory } from "../../../api/category.api";
import toast from "react-hot-toast";

const BrandForm = () => {
  const methods = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
    resolver: yupResolver(categorySchema),
    mode: "all",
  });

  // mutation
  const { mutate, isPending } = useMutation<
    ICategoryData,
    Error,
    ICategoryData
  >({
    mutationFn: postCategory,
    onSuccess: (response: any) => {
      toast.success(response?.message || "Brand Added");
      methods.reset();
    },
    onError: (err: any) => {
      toast.error(err?.message || "Something went wrong.");
    },
  });

  const onSubmit = (data: ICategoryData) => {
    console.log("Brand Form", data);
    mutate(data);
  };
  return (
    <div className="w-1/3 mx-auto">
      {/* hook form provider */}
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col"
        >
          {/* name input */}
          <Input
            name="name"
            id="name"
            label="Brand Name"
            placeholder="Nike"
            required
          />
          {/* description */}
          <TextArea
            name="description"
            id="description"
            label="Description"
            placeholder="Describe Brand here..."
            required
          />
        </form>
      </FormProvider>
      <div>
        <Button
          label={isPending ? "" : "Submit"}
          type="submit"
          isPending={isPending}
        />
      </div>
    </div>
  );
};

export default BrandForm;
