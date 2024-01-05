import { Link } from "react-router-dom";


function Main() {
    return (
      <>
      <div className="Main">
        <Link to="/">
            <h1>SHOPPING</h1>
        </Link>
        <Link to="/admin">
            <h1>ADMIN</h1>
        </Link>
        <Link to="/my-bag">
            <h1>MyBag</h1>
        </Link>
        
      </div>
      <br></br>
      <div>
        
      </div>
  
    </>
    );
  }
  
  export default Main;