export async function getLocationByAddress(address:any) {
  const results = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${address}&key=1ed40ab8f4ff44c69343f1032fc64270`)
  .then(res =>  res.json())
  .then(res =>  res.results[0].geometry)
  .catch(err=>console.log(err))
  return results
}
