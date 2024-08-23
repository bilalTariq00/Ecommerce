import { client, urlFor } from '../../../../sanity/lib/client';
import ProductDetailsClient from './state'; 

export default async function ProductDetails({ params }) {
  const { slug } = params;

  // Fetch product data using the slug
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]';

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  if (!product) {
    return (
      <div>
        <h1>Product not found</h1>
      </div>
    );
  }

  const { image, name, details, price } = product;

  return (
    <ProductDetailsClient
       product={product}
      products={products}
    />
  );
}

// Generate static paths for products
export async function generateStaticParams() {
  const query = `*[_type == "product"]{ slug { current } }`;
  const products = await client.fetch(query);

  return products.map((product) => ({
    slug: product.slug.current,
  }));
}
