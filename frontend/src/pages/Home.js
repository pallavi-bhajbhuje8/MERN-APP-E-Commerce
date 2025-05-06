import React from 'react'
import BannerProduct from '../components/BannerProduct'
import CategoryList from '../components/CategoryList'
import HorizantalCardProduct from '../components/HorizantalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
    return (
        <div>
            <CategoryList />
            <BannerProduct />
            <HorizantalCardProduct category={"airpodes"} heading={"Top's Airpodes"} />
            <HorizantalCardProduct category={"earphones"} heading={"Wired Earphones"} />
            <VerticalCardProduct category={"watches"} heading={"Popular's Watches"} />
            <VerticalCardProduct category={"mouse"} heading={"Mouse"} />
            <VerticalCardProduct category={"television"} heading={"Televisions"} />
            <VerticalCardProduct category={"Camera"} heading={"Camera & Photography"} />
            <VerticalCardProduct category={"speakers"} heading={"Bluetooth Speakers"} />
            <VerticalCardProduct category={"refrigerator"} heading={"Refrigerator"} />
            <VerticalCardProduct category={"trimmers"} heading={"Trimmers"} />
        </div>
    )
}

export default Home