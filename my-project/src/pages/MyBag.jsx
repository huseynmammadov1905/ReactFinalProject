import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addOrders, deleteGoodToMyBag, fetchMyBag, sortMyBag } from "../app/features/productSlice";
import { FaSort } from "react-icons/fa";
import { FaMoneyCheck } from "react-icons/fa"
import { FaRegTrashAlt } from "react-icons/fa";



function MyBag() {
    const {myBag} = useSelector((state)=> state.productReducer)
    const [flag,setFlag] = useState(false);
    const [searchText,setSearchText] = useState(false);
    const dispatch = useDispatch();
    const ref = useRef(null);
    const [name,setName] = useState("");
    const [surname,setSurname] = useState("");
    const [number,setNumber] = useState("");
    const [mail,setMail] = useState("");
    const [filteredMyBag,setFilteredMyBag] = useState([...myBag])

    useEffect(()=>{
        dispatch(fetchMyBag())
    },[dispatch,flag])

    useEffect(()=>{
      searchText ? setFilteredMyBag(myBag.filter(prod => prod.product_name.toLocaleLowerCase("AZ").startsWith(searchText.toLocaleLowerCase("AZ")))) : setFilteredMyBag([...myBag]);
      console.log(filteredMyBag);
    },[searchText,myBag,flag,dispatch])
    const buyFuntion =(e)=>{
      if(name.length> 0 && surname.length> 0 && mail.length>0 && number.length>0){
      e.preventDefault();
      let ord = {
        Name:name,
        Surname:surname,
        Number:number,
        Mail:mail,
        orders:[...myBag]
      }
      dispatch(addOrders(ord));

      fetch("http://localhost:7000/clear-mybag", {
        method: "DELETE"
    })
        .then(res => res.text())
        .then(data => console.log(data))
        .then(() => ref.current.reset())
        .then(() => {
            setName("");
            setSurname("");
            setNumber("");
            setMail("");
            setFlag(!flag)});
    }
  }

    const deleteFromMyBag=(item)=>{
        dispatch(deleteGoodToMyBag(item.id))
        setFlag(!flag)
    }
   

    return (
         <div >
          <div className="Main">

         
            <div className="searchInput">
            <input onChange={e=> setSearchText(e.target.value)} placeholder="search" type="text"/>
            </div>
        </div>
      <div>
        <form ref={ref} >
          <input type="text" placeholder="Name" required  className="inputAdmin" onChange={(e)=>setName(e.target.value)}/>
          <br></br>
          <br></br>
          <input type="text" placeholder="Surname" required className="inputAdmin" onChange={(e)=>setSurname(e.target.value)}/>
          <br></br>
          <br></br>
          <input type="text" placeholder="Number" required  className="inputAdmin" onChange={(e)=>setNumber(e.target.value)}/>
          <br></br>
          <br></br>
          <input type="mail" placeholder="Mail" required  className="inputAdmin" onChange={(e)=>setMail(e.target.value)}/>
          <br></br>
          <br></br>
          {/* <button >Buy</button> */}
          <FaMoneyCheck className="buy"  onClick={buyFuntion}/>
        </form>
      </div>
     
      {/* // <button }>sort</button> */}
      <ul style={{listStyle:'none'}}>
        {filteredMyBag.map((item,index)=>{
          return(
            <div key={index} className="card">
             <FaRegTrashAlt onClick={()=>deleteFromMyBag(item)} />
               <div> <img src="https://www.alexandra.co.uk/media/catalog/product/n/u/nu126_bk_front.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700" alt='Logo'></img>
               <p> {item.product_price} AZN </p></div>
              
               
                {/* <h5 >{item.product_name}</h5> */}
                <div>

               
                <div>

              
                <h1 style={{fontSize:30,fontStyle:'inherit'}} >{item.product_name}</h1>
                </div>
                <div>

                    <p> {item.product_description}  </p>
                </div>
                </div>
            </div>
          )
        })}
      </ul>
    </div>
    );
  }
  
  export default MyBag;
  