export async function getPostComments(api, id){
  let data = ""
  const response = await fetch(`${api}comments?postId=${id}`);
  response.ok
    ? data = await response.json()
    : data = false
  return data
}