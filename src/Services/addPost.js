export async function addNewPost(url, data, method, id){
  let responseApi = ''
  let urlApi = id 
    ? url + 'posts/' + id 
    : url + 'posts'

  const res = await fetch(urlApi, {
    method: method || 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    }
  })
  if(res.ok){
    responseApi = await res.json()
  }else{
    responseApi = res.status
  }
  return responseApi
}