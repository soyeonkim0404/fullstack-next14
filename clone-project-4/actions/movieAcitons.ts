'use server';

import { createServerSupabaseClient } from '../utils/supabase/server';

function handleError(error) {
  if (error) {
    console.error(error);
    throw error;
  }
}

export async function searchMovies({ search, page, pageSize }) {
  const supabase = await createServerSupabaseClient();

  const { data, count, error } = await supabase
    .from('movie')
    .select('*', { count: 'exact' })
    .like('title', `%${search}%`)
    .range((page - 1) * pageSize, page * pageSize - 1);

  const hasNextPage = count > page * pageSize;

  if (error) {
    console.error(error);
    return {
      data: [],
      count: 0,
      page: null,
      pageSize: null,
      error
    };
  }

  return {
    data,
    page,
    pageSize,
    hasNextPage
  };
}
/*
select : api 전체조회,
like : input text에 포함된 영화 조회,
range : from은 page에서의 첫번째 개수를 의미, to는 page에서의 마지막 아이템을 의미 (page가 2, pageSize가 12일 경우 from은 12, to는 23)
*/

export async function getMovie(id) {
  const superbase = await createServerSupabaseClient();
  const { data, error } = await superbase
    .from('movie')
    .select('*')
    .eq('id', id)
    .maybeSingle(); //maybeSingle : 데이터 하나만 조회하지만, 하나도 없으면 null로 처리

  handleError(error);

  return data;
}
