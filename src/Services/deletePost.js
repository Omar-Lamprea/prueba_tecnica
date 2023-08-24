export async function deletePostId(api, id){
  let data = ''
  try {
    const res = await fetch(api + "posts/" + id, {method: "Delete"})
    res.ok ? data = true : data = false
  } catch (error) {
    return false
  }

  return data
}