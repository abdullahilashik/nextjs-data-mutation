"use client";
import FormActionButton from "@/components/form-action";
import { createPost } from "@/lib/actions";
import { useFormState } from "react-dom";

export default function PostCreateForm() {
  const [state, formAction] = useFormState(createPost, { errors: null });
  
  return (
    <form action={formAction}>
      <p className="form-control">
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" />
        {state?.errors?.title && <span style={{color: 'red'}}>{state?.errors?.title}</span>}
      </p>
      <p className="form-control">
        <label htmlFor="image">Image URL</label>
        <input
          type="file"
          accept="image/png, image/jpeg"
          id="image"
          name="image"
        />
        {state?.errors?.image && <span style={{color: 'red'}}>{state?.errors?.image}</span>}
      </p>
      <p className="form-control">
        <label htmlFor="content">Content</label>
        <textarea id="content" name="content" rows="5" />
        {state?.errors?.content && <span style={{color: 'red'}}>{state?.errors?.content}</span>}
      </p>
      <FormActionButton />
    </form>
  );
}
