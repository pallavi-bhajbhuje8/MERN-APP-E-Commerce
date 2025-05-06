import React, { useEffect, useState } from 'react'
import SummaryApi from '../commone';
import AdminProductCard from '../components/AdminProductCard';
import UploadProduct from '../components/UploadProduct';


const AllProducts = () => {
  const [openuploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([])
  const fetchAllProduct = async () => {
    const response = await fetch(SummaryApi.allProduct.url)
    const dataResponse = await response.json()
    console.log("product data", dataResponse)
    setAllProduct(dataResponse?.data || [])
  }
  useEffect(() => {
    fetchAllProduct()
  }, [])

  return (
    <div>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className='font-bold text-lg'>All Product</h2>
        <button className='border-2 py-1 border-red-600 text-red-600 px-3 rounded-full hover:bg-red-600 hover:text-white transition-all' onClick={() => setOpenUploadProduct(true)}>Upload Products</button>
      </div>
      {/*** all product ***/}
      <div className='flex items-center flex-wrap gap-5 py-4'>
        {
          allProduct.map((product, index) => {
            return (
              <AdminProductCard data={product} key={index + "allProduct"} fetchdata={fetchAllProduct} />
            )

          })

        }

      </div>
      {/* upload product component */}
      {
        openuploadProduct && (
          <UploadProduct onClose={() => setOpenUploadProduct(false)} fetchData={fetchAllProduct} />
        )
      }

    </div>
  )
}

export default AllProducts