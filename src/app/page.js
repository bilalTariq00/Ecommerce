import React from 'react';
import { HeroBanner, FooterBanner,Product } from './components/HomePage/pages';
import { client } from '../../sanity/lib/client';

const Home = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      <div className='products-heading'>
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className='products-container'>
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </>
  );
};

export default Home;
