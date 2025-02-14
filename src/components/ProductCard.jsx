import React from "react";


function productCard({ list = [] }) {

    return (

        <ul className="product_list_container">
            {list?.map((data) =>
                <li>
                
                    <img src={data.url} alt="product" />
                    <p className="product_name">{data?.type}</p>
                    <p className="category_text">{data?.category}</p>
                </li>

            )}

        </ul>

    )
}
export default productCard