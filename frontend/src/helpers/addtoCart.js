import SummaryApi from "../commone"
import { toast } from "react-toastify"

const addtoCart = async (e, id) => {
    e?.stopPropagation()
    e?.preventDefault()

    const response = await fetch(SummaryApi.addToCartProduct.url, {
        method: SummaryApi.addToCartProduct.method,
        credentials: 'include',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(
            { productId: id }
        )
    })
    const responsData = await response.json()
    if (responsData.success) {
        toast.success(responsData.message)
    }
    if (responsData.error) {
        toast.error(responsData.message)
    }

    return responsData

}

export default addtoCart