import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchGoods = createAsyncThunk(
    "fetchGoods",
    async ()=>{
        let res = fetch("http://localhost:7000/goods");
        return (await res).json();
    }
)

export const fetchMyBag = createAsyncThunk(
    "fetchMyBag",
    async ()=>{
        let res = fetch("http://localhost:7000/my-bag");
        return (await res).json();
    }
)

export const fetchOrders = createAsyncThunk(
    "fetchOrders",
    async ()=>{
        let res = fetch("http://localhost:7000/orders");
        return (await res).json();
    }
)

const initialState = {
    goods:[],
    myBag:[],
    orders:[],
    sorted:false,
    filteredGoods:[],
    filteredMyBag : [],
    myBagSort:false,
    
}

const productSlice = createSlice({
    name:"productSlice",
    reducers:{
        sortGoods:(state)=>{
            let newGoods = [...state.goods];
            state.sorted? newGoods.sort((a,b)=> a.product_price - b.product_price ): newGoods.sort((a,b)=> b.product_price - a.product_price);
            state.sorted = !state.sorted;
            state.goods = newGoods;
        },
        searchGoods:(state,action)=>{
            let search =action.payload;
            state.filteredGoods = state.goods.filter(pr=>pr.product_name.toLocaleLowerCase("AZ").startsWith(search.toLocaleLowerCase("AZ")));
        },
        deleteGood:(state,action)=>{
            fetch(`http://localhost:7000/delete-goods/${action.payload}`,{
                method:"DELETE"
            })
            .then(res=> res.text())
            .then(data=> console.log(data))
        },
        addGoodToMyBag:(state,action)=>{
            fetch("http://localhost:7000/add-mybag",{
                method:"POST",
                headers:{
                    "Content-type":"application/json"
                },
                body:JSON.stringify(action.payload)
            })
            .then(res=> res.text())
            .then(data=> console.log(data));
        },
        deleteGoodToMyBag:(state,action)=>{
            fetch(`http://localhost:7000/delete-mybag/${action.payload}`,{
                method:"DELETE",
            })
            .then(res=> res.text())
            .then(data=> console.log(data));
        },
        sortMyBag:(state)=>{
            let newBag = [...state.filteredMyBag];
            state.myBagSort? newBag.sort((a,b)=>a.product_price-b.product_price):newBag.sort((a,b)=> b.product_price -  a.product_price);
            state.myBagSort = !state.myBagSort;
            state.filteredMyBag = [...newBag]
        },
        addOrders:(state,action)=>{
            fetch("http://localhost:7000/add-orders",{
                method:"POST",
                headers:{
                    'Content-type':"application/json"
                },
                body:JSON.stringify(action.payload)
            })
            .then(res => res.text())
            .then(data=> console.log(data))
        }
    },
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(fetchGoods.fulfilled,(state,action)=>{
            state.goods = action.payload;
        })
        builder.addCase(fetchMyBag.fulfilled,(state,action)=>{
            state.myBag = action.payload;
            state.filteredMyBag = [...state.myBag];
        })
    }
})


export const {sortGoods,searchGoods,deleteGood,addGoodToMyBag,deleteGoodToMyBag,sortMyBag,addOrders} = productSlice.actions;
export default productSlice.reducer;
