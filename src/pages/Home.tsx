import * as React from 'react';

import Header from './Header';

const Home = () => {
  return (
    <>
      <Header />
      <div className="w-full max-w-xs m-auto mt-20">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">Detail Information</form>
        <p className="text-center text-gray-500 text-xs">
          &copy;2021 Stanley C Sky. All rights reserved.
        </p>
      </div>
    </>
  );
};

export default Home;
