'use server';

import { createServerSupabaseClient } from '../utils/supabase/server';
import * as process from 'process';

function handleError(error) {
  if (error) {
    console.error(error);
    throw error;
  }
}

export async function uploadFile(formData: FormData) {
  const supabase = await createServerSupabaseClient();

  const files = Array.from(formData.entries()).map(
    ([name, file]) => file as File
  );

  const results = await Promise.all(
    files.map(
      file =>
        supabase.storage
          .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET)
          .upload(file.name, file, { upsert: true }) //upsert = update + insert 합친말, 파일명이 같은 파일이 업로드 될경우 update 아닐경우 insert
    )
  );

  return results;

  //console.log(Array.from(formData.entries()));

  /*const { data, error } = await supabase.storage
    .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET)
    .upload(file.name, file, { upsert: true }); //upsert = update + insert 합친말, 파일명이 같은 파일이 업로드 될경우 update 아닐경우 insert

  handleError(error);

  return data;*/
}

export async function searchFiles(search: string = '') {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase.storage
    .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET)
    .list(null, { search });

  handleError(error);

  return data;
}

export async function deleteFile(fileName: string = '') {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase.storage
    .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET)
    .remove([fileName]);

  handleError(error);

  return data;
}
