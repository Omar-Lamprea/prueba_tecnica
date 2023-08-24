export async function getUser(api, userId){
  let data = ""
  const response = await fetch(api + 'users/' + userId);
  response.ok
    ? data = await response.json()
    : data = false
  return data
}