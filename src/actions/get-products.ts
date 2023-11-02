const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

async function getProducts() {
  const res = await fetch(URL);

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const data = await res.json();
  return data;
}

export default getProducts;
