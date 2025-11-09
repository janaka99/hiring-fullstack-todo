import type { ITodo } from "@/types/todo.types";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TodoSchema, type TodoSchemaType } from "@/schemas/todo-schema";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { useTodoContext } from "@/context/todo-state";
import { toast } from "sonner";

export default function TodoForm({
  todo,
  cancelEdit,
}: {
  todo?: ITodo;
  cancelEdit: () => void;
}) {
  const { addTodo, updateTodo } = useTodoContext();
  const form = useForm({
    resolver: zodResolver(TodoSchema),
    defaultValues: {
      _id: todo ? todo._id : undefined,
      description: todo ? todo.description : "",
      title: todo ? todo.title : "",
    },
  });

  const { handleSubmit, formState } = form;

  const onSubmit = async (data: TodoSchemaType) => {
    const res = await (todo ? updateTodo(data, todo._id) : addTodo(data));
    if (res.success) {
      form.reset();
      cancelEdit();
      if (todo) {
        form.reset({
          _id: todo._id,
          title: todo.title,
          description: todo.description || "",
        });
      }

      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  return (
    <Card className="w-full p-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  disabled={formState.isSubmitting}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="description"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                <Textarea
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  disabled={formState.isSubmitting}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <div className="flex gap-6  justify-end items-center">
            <Button
              variant="custom-gradient"
              disabled={formState.isSubmitting}
              className="w-32 cursor-pointer"
            >
              {todo ? "Update" : "Add"}
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={formState.isSubmitting}
              onClick={cancelEdit}
              className="w-32 rounded-xl cursor-pointer"
            >
              Cancel
            </Button>
          </div>
        </FieldGroup>
      </form>
    </Card>
  );
}
