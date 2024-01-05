import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaSort } from "react-icons/fa";
import { deleteGood, fetchGoods, sortGoods } from "../app/features/productSlice";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { useParams } from "react-router-dom";


function Products() {
    const {goods} = useSelector((state)=> state.productReducer);
    const dispatch = useDispatch();
    const [modal,setModal] = useState(false)
    const [_productName,setProductName] = useState("");
    const [_productDescription,setProductDescription] = useState("");
    const [_productPrice,setProductPrice] = useState("");
    const [_productImg,setProductImg] = useState("");
    const [flag, setFlag] = useState(false);
    const [filteredProducts,setFilteredProducts] = useState([...goods]);
    const ref = useRef(null);
    const [searchText,setSearchText] = useState(false);
    const [price,setPrice] = useState(0);
    const [productId,setProductId] = useState(0)
    const {id} = useParams();
    const product = goods.find(prd => prd.id === +id);
    let [goodName,setGoodName] = useState('')
    let [goodDescription,setGoodDescription] = useState('')
    // const [goodName,setGoodName] = useState('')

    const sortGood = ()=>{
        dispatch(sortGoods())
    }
    // useEffect(()=>{
    //     if(!price&& product){
    //         setPrice(product.product_price)
    //     }
    // },[price,product])

    useEffect(()=>{
        dispatch(fetchGoods());
        
    },[dispatch,flag])

    const addNewGood = (e)=>{
        let obj = {
            product_name : _productName,
            product_description : _productDescription,
            product_price : _productPrice
        }
        fetch("http://localhost:7000/add-goods",{
            method:"POST",
            headers:{
                'Content-type':"application/json"
            },
            body:JSON.stringify(obj)
        })
        .then(res=>res.text())
        .then(data => console.log(data))
        .then(()=>{
            setFlag(!flag)
        })
        ref.current.reset();
    }
    const deleteGoods = (item)=>{
        dispatch(deleteGood(item.id))
        setFlag(!flag)
    }

    const editGood = (obj)=>{
        fetch(`http://localhost:7000/change-goods/${obj.id}`,{
            method:"PUT",
            headers:{
                'Content-type':"application/json"
            },
            body:JSON.stringify({...product,product_price:price,product_name:obj.product_name,product_description:obj.product_description,id:obj.id})
        })
        .then(res=>res.text())
        .then(data=> console.log(data))
        .then(()=>{
            setFlag(!flag)
        })
        setModal(!modal)
        console.log(obj)
    }
    useEffect(()=>{
        searchText ? setFilteredProducts(goods.filter(prod => prod.product_name.toLocaleLowerCase("AZ").startsWith(searchText.toLocaleLowerCase("AZ")))) : setFilteredProducts([...goods]);
        console.log(filteredProducts);
    },[searchText,goods,flag,dispatch])

    return (
                <div className="">
                            
                
                    <div className="Admin">
                            <div className="admin2">
                                
                                <div className="searchInput">
                                    <input onChange={e=> setSearchText(e.target.value)} placeholder="search" type="text"/>

                                    <div className="Main2">
                                    
                                    <FaSort  onClick={sortGood}/>
                                  
                                      </div>
                                </div>
                                <br></br>
                               
                                <br></br>
                                <div>
                                <div>
                                     <form ref={ref} >
                                    <input onChange={e=>setProductName(e.target.value)} type="text" 
                                        required placeholder="Name" className="inputAdmin" />
                                        <input onChange={e=>setProductDescription(e.target.value)} type="text" 
                                        required placeholder="Description" className="inputAdmin"/>
                                        <input onChange={e=>setProductPrice(e.target.value)} type="text" 
                                        required placeholder="Price" className="inputAdmin"/>
                                        <input onChange={e=>setProductImg(e.target.value)} type="text" 
                                        required placeholder="img" className="inputAdmin"/>


                                 </form>
                                 <br></br>
                                 <button className="buy" onClick={addNewGood}>Add Product</button>

                            </div>
                                </div>
                            </div>
                        {filteredProducts.map((pr,index)=>{
                        return(
                            
                            <div key={index} className="card">
                                <FaRegTrashAlt style={{fontSize:'50px'}} onClick={()=>deleteGoods(pr)} />
                                <br></br>
                               
                                <div>
                                    <div> <img src="https://www.alexandra.co.uk/media/catalog/product/n/u/nu126_bk_front.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700" alt='Logo'></img>
                                    <p> {pr.product_description}  </p>

                                    </div>
                                    {/* <FaRegTrashAlt onClick={()=>deleteGoods(pr)} /> */}
                                    
                                    <p style={{fontSize:30,fontStyle:'inherit'}}> {pr.product_price} AZN </p>

                                    {/* {console.log(index)}
                                        {console.log("d")}
                                        {console.log(pr.id)} */}
                                        
                                       

                                    {modal && (
                                        <div id="">
                                            {/* {setProductId(pr.id)} */}
                                        <input placeholder={pr.product_price}  onChange={(e)=> setPrice(e.target.value)}/>
                                        
                                        <button onClick={()=>
                                            {
                                                
                                                setGoodName(goods[index].product_name)
                                                setGoodDescription(goods[index].product_description)
                                                setProductId(index)

                                                editGood(goods[index])
                                                }}>Edit</button>
                                      
                                        </div>
                                    )}
                                    
                                   
                                    <p> <MdEdit onClick={()=>setModal(!modal)}  style={{fontSize:'50px'}}  /></p>
                                </div>
                                                
                                    <h1 style={{fontSize:30,fontStyle:'inherit'}} >{pr.product_name}</h1>


                            </div>
                        )

                    })}  
                   
                    </div>
                </div>
    )
}

export default Products;