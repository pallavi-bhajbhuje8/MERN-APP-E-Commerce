import React, { useState } from 'react'
import { CgClose } from "react-icons/cg";
import productCategory from "../helpers/productCategory"
import { FaCloudUploadAlt } from "react-icons/fa";
import UploadImage from '../helpers/UploadImage';
import Displayimage from './Displayimage';
import { MdDelete } from "react-icons/md";
import SummaryApi from '../commone';
import { toast } from 'react-toastify'
const UploadProduct = ({
    onClose, fetchData
}) => {
    const [data, setData] = useState({
        productName: "",
        brandName: "",
        category: "",
        productImage: [],
        discription: "",
        price: "",
        sellingPrice: ""
    })
    const [openfullscreenimage, setOpenFullScreenImage] = useState(false)
    const [fullScreenImage, setfullScreenImage] = useState("")
    const handleOnChange = (e) => {
        const { name, value } = e.target
        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }


    const handleUploadProduct = async (e) => {
        const file = e.target.files[0]
        const uploadImageCloudinary = await UploadImage(file)
        setData((preve) => {
            return {
                ...preve,
                productImage: [...preve.productImage, uploadImageCloudinary.url]
            }

        })

    }
    const handleDeleteProductImage = async (index) => {
        console.log("image index", index)
        const newProductImage = [...data.productImage]
        newProductImage.splice(index, 1)
        setData((preve) => {
            return {
                ...preve,
                productImage: [...newProductImage]
            }
        })
    }

    // {******* upload product *******}
    const handleSumit = async (e) => {
        e.preventDefault()
        const response = await fetch(SummaryApi.uploadProduct.url, {
            method: SummaryApi.uploadProduct.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })

        const responseData = await response.json()
        if (responseData.success) {
            toast.success(responseData?.message)
            onClose()
            fetchData()
        }
        if (responseData.error) {
            toast.error(responseData?.message)
        }


    }
    return (
        <div className='fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
            <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden  '>
                <div className='flex justify-between items-center pb-3'>
                    <h2 className='font-bold text-lg'>Upload Product</h2>
                    <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
                        <CgClose />
                    </div>
                </div>
                <form className='grid p-4 gap-2 overflow-y-scroll h-full pb-5' onSubmit={handleSumit}>
                    <label htmlFor='productName' >Product Name :</label>
                    <input type='text'
                        id='productName'
                        placeholder='enter product name'
                        name='productName'
                        value={data.productName}
                        onChange={handleOnChange}
                        className="p-2 bg-slate-100 border rounded"
                        required
                    />
                    <label htmlFor='brandName' className='mt-3'>Brand Name :</label>
                    <input type='text'
                        id='brandName'
                        placeholder='enter brand name'
                        name='brandName'
                        value={data.brandName}
                        onChange={handleOnChange}
                        className="p-2 bg-slate-100 border rounded"
                        required
                    />
                    <label htmlFor='category' className='mt-3'>Category :</label>
                    <select required value={data.category} name='category' onChange={handleOnChange} className="p-2 bg-slate-100 border rounded">
                        <option value={""}>Select Category</option>
                        {
                            productCategory.map((el, index) => {
                                return (
                                    <option value={el.value} key={el.value + index}>{el.label}</option>
                                )
                            })
                        }
                    </select>
                    <label htmlFor='productImage' className='mt-3'>Product Image :</label>
                    <div className='p-2 bg-slate-100 border rounded w-full h-32 flex justify-center items-center'>
                        <label htmlFor='uploadImageInput'>
                            <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                                <span className='text-4xl'><FaCloudUploadAlt /></span>
                                <p className='text-sm'>Upload Product Image</p>
                                <input type='file' id="uploadImageInput" className='hidden' onChange={handleUploadProduct} />
                            </div>
                        </label>
                    </div>
                    <div>
                        {
                            data?.productImage[0] ? (
                                <div className='flex items-center gap-2'>
                                    {
                                        data.productImage.map((el, index) => {
                                            return (
                                                <div className='relative group'>
                                                    <img
                                                        src={el}
                                                        alt={el}
                                                        width={80}
                                                        height={80}
                                                        className=' p-4 bg-slate-100 border cursor-pointer'
                                                        onClick={() => {
                                                            setOpenFullScreenImage(true)
                                                            setfullScreenImage(el)
                                                        }} />
                                                    <div className='absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer' onClick={() => handleDeleteProductImage(index)}>
                                                        <MdDelete />
                                                    </div>
                                                </div>

                                            )
                                        })
                                    }
                                </div>
                            ) : (
                                <p className='text-red-600 text-xs'>"Please upload product image</p>
                            )
                        }
                    </div>
                    <label htmlFor='price' className='mt-3'>Price :</label>
                    <input type='number'
                        id='price'
                        placeholder='enter  price'
                        name='price'
                        value={data.price}
                        onChange={handleOnChange}
                        className="p-2 bg-slate-100 border rounded" required
                    />

                    <label htmlFor='sellingPrice' className='mt-3'>Selling Price :</label>
                    <input type='number'
                        id='sellingPrice'
                        placeholder='enter selling price'
                        name='sellingPrice'
                        value={data.sellingPrice}
                        onChange={handleOnChange}
                        className="p-2 bg-slate-100 border rounded" required
                    />
                    <label htmlFor='discription' className='mt-3'> Discription :</label>
                    <textarea className='h-28 bg-slate-100 border resize-none p-1' placeholder='enter product description' rows={3} onChange={handleOnChange} name="discription" value={data.discription} required>

                    </textarea>
                    <button className='px-3 py-1 bg-red-600 text-white mb-10 hover:bg-red-700'>Upload Product</button>

                </form>
            </div>
            {
                openfullscreenimage && (
                    <Displayimage onClose={() => setOpenFullScreenImage(false)} imgUrl={fullScreenImage} />
                )
            }

        </div>
    )
}

export default UploadProduct