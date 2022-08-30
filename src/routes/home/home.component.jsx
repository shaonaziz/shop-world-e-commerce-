import Directory from "../../components/directory/Directory";
import {Outlet} from 'react-router-dom'
import { catergories } from "../../data/catagories";

const Home = () => {
    return (
      <div>
        <Outlet/>
        <Directory catergories={catergories} />
      </div>
    );
  };
  
  export default Home;