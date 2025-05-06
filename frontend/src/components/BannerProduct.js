import React, { useEffect, useState } from 'react'
// import image1 from "../assest/banner/background-img.png"
import image1 from "../assest/banner/image2.jpg"
import image2 from "../assest/banner/image1.jpg"
import image3 from "../assest/banner/image3.jpg"
import image4 from "../assest/banner/image4.jpg"
import image5 from "../assest/banner/image5.jpg"
import image6 from "../assest/banner/image6.jpg"
import image7 from "../assest/banner/image7.jpg"
import image8 from "../assest/banner/image8.jpg"
import image9 from "../assest/banner/image9.jpg"
import image10 from "../assest/banner/image10.jpg"
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";

const BannerProduct = () => {
    const [currentImage, setCurrentImage] = useState(0)
    const desktopImages = [
        image1,
        image2,
        image3,
        image4,
        image5,
    ]
    const mobileImages = [
        image6,
        image7,
        image8,
        image9,
        image10
    ]
    const nextImage = () => {
        if (desktopImages.length - 1 > currentImage) {
            setCurrentImage(preve => preve + 1)
        }
    }
    const preveImage = () => {
        if (currentImage != 0) {
            setCurrentImage(preve => preve - 1)
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (desktopImages.length - 1 > currentImage) {
                nextImage()
            } else {
                setCurrentImage(0)

            }

        }, 5000)

        return () => clearInterval(interval)

    }, [currentImage])

    return (
        <div className='container mx-auto px-4 rounded '>
            <div className='h-52 md:h-72 w-full bg-slate-200 relative'>
                <div className='absolute z-10 h-full w-full md:flex items-center hidden'>
                    <div className='flex justify-between w-full text-2xl'>
                        <button onClick={preveImage} className='bg-white shadow-md rounded-full p-1'><FaAngleRight /></button>
                        <button onClick={nextImage} className='bg-white shadow-md rounded-full p-1'><FaAngleLeft /></button>
                    </div>
                </div>

                {/* desktop and tablet version */}
                <div className=' hidden md:flex h-full w-full overflow-hidden'>
                    {
                        desktopImages.map((imageURL, index) => {
                            return (
                                <div className='w-full h-full min-w-full min-h-full transition-all' key={imageURL} style={{ transform: `translateX(-${currentImage * 100}%)` }}>
                                    <img src={imageURL} className='w-full h-full ' />
                                </div>

                            )
                        })
                    }
                </div>
                {/**** moblie version****/}
                <div className='flex h-full w-full overflow-hidden md:hidden'>
                    {
                        mobileImages.map((imageURL, index) => {
                            return (
                                <div className='w-full h-full min-w-full min-h-full transition-all' key={imageURL} style={{ transform: `translateX(-${currentImage * 100}%)` }}>
                                    <img src={imageURL} className='w-full h-full object-cover' />
                                </div>

                            )
                        })
                    }
                </div>



            </div>
        </div>
    )
}

export default BannerProduct