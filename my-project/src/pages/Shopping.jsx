import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addGoodToMyBag, fetchGoods, searchGoods, sortGoods } from "../app/features/productSlice";
import { FaBagShopping } from "react-icons/fa6";
import { FaSort } from "react-icons/fa";



function Shopping() {
    const {goods} = useSelector((state)=> state.productReducer);
    const dispatch = useDispatch();
    const [flag,setFlag] = useState(false)
    const [searchText,setSearchText] = useState(false);
    const [filteredProducts,setFilteredProducts] = useState([...goods]);

    useEffect(()=>{
        dispatch(fetchGoods())
    },[dispatch,flag])

    const sortGood=()=>{
        dispatch(sortGoods())
    }

    // const searchGood = (e)=>{
    //     dispatch(searchGoods(e.target.value))
    // }
    const addMyBag =(prooduct)=>{
        dispatch(addGoodToMyBag(prooduct))
    }
    useEffect(()=>{
        searchText ? setFilteredProducts(goods.filter(prod => prod.product_name.toLocaleLowerCase("AZ").startsWith(searchText.toLocaleLowerCase("AZ")))) : setFilteredProducts([...goods]);
        console.log(filteredProducts);
    },[searchText,goods,flag,dispatch])
    return (
      <div className="Shopping">
        <div className="searchInput">
            <input onChange={e=> setSearchText(e.target.value)} placeholder="search" type="text"/>

            <div className="Main2">
            <FaSort  onClick={sortGood}/>
            </div>
        </div>
        <br></br>
           
        <div>

            
        {filteredProducts.map((pr,index)=>{
                return(
                    <div key={index}  className="card">
                {/* <FaBagShopping  onClick={()=>addToMyBag(pr)}/> */}
                <FaBagShopping  size={"50px"} onClick={()=>addMyBag(pr)}/>
                <div> <img src="https://www.alexandra.co.uk/media/catalog/product/n/u/nu126_bk_front.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700" alt='Logo'></img>
                <p style={{fontSize:30,fontStyle:'inherit'}}> {pr.product_price} AZN </p></div>
                
                <div style={{fontSize:50,fontStyle:'inherit'}} className="title">
                    <p >{pr.product_name}</p>
                    <br></br>
                    <p style={{fontSize:15,fontStyle:'italic'}}> {pr.product_description}  </p>
                        
                        <br></br>
                        
                    </div>
                    <br></br>
                    <br></br>
                    
                   
                </div>
                
                )
            })}
            
           </div>
      </div>
    );
  }
  
  export default Shopping;
  