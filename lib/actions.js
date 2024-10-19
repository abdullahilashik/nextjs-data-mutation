"use server";

import { redirect } from "next/navigation";
import { storePost, updatePostLikeStatus } from "./posts";
import { uploadImage } from "./cloudinary";
import { revalidatePath } from "next/cache";

function isInvalidText(text) {
    if(!text || text.trim() == ''){
        return true;
    }
    return false;
}

export async function createPost(prevState, formData) {    
    const title = formData.get('title');
    const image = formData.get('image');
    const content = formData.get('content');
    const tempData = [
      title, content, image
    ];
    let error = {};
    if(isInvalidText(title)){
        error.title = 'Title is required';
    }
    if(isInvalidText(content)){
        error.content = 'Content can not be left empty!'
    }
    if(!image || image.size==0){
        error.image = 'Image is required';
    }

    if(Object.keys(error).length>0){
        return {errors: error};
    }    

    // upload image
    const imageUrl = await uploadImage(image);
    
    await storePost({
      imageUrl,
      title,
      content,
      userId: 1
    })

    revalidatePath('/', 'layout');
    redirect('/feed');
  }

  export async function toggleUserLikeStatus(postId) {
    await updatePostLikeStatus(postId, 2);
    revalidatePath('/feed', 'layout');
  }