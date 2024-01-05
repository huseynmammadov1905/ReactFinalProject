import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


function Orders() {

        const [orders,setOrders] = useState([]);
        // const {orders} = useSelector((state)=>state.productReducer)

        useEffect(()=>{
            fetch("http://localhost:7000/orders")
            .then((res)=>res.json())
            .then((data)=> setOrders(data))
        },[])

    return (
        <div>
            {orders.map((order,index)=>{
                let price = 0;
                console.log(order.orders)
                for(const ord of order.orders){
                    price+= ord.product_price;
                }
                console.log(price)
                return(
                   <div className="order" key={index}>
                            
                        <p> <h4>Name:</h4> {order.Name} </p>

                        
                        <p>   <h4>Surname:</h4> {order.Surname}</p>
                          
                        <p>  <h4>Number:</h4> {order.Number}</p>
                            
                        <p> <h4>Mail:</h4> {order.Mail}</p>
                           
                        <p>  <h4>Amount:</h4> {price} AZN</p>
                        {console.log(order.Name)}
            {console.log(order.Surname)}
                   </div>
                )
            })}

            {console.log(orders)}
          
        </div>
    )
}

export default Orders;