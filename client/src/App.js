import { useState } from "react";
import axios from "./axios";
import "./app.css";
import Profile from "./components/Profile";
import Spinner from "./components/Spinner";
function App() {
   const [repos, setReops] = useState([]);
   const [username, setUsername] = useState();
   const [loading, setLoading] = useState(false);
  //  useEffect( async() => {
  //        const data = await axios.get(`/api/profile/github/${username}`);
  //        if(data){
  //            setReops(data);
  //        }else{
  //          console.log('server error');
  //        }
  //  },[username])
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if(username){
      const res = await axios.get(`/profile/github/${username}`);
      
      if(res){
          setReops(res.data);
          setLoading(false);
      }else{
        console.log('server error');
      }
    }
    // console.log('repos', repos);
  }
  return (
    <div className="main-page my-1">
          <div className="container">
          <h1 style={{textAlign:"center"}}>Get Repositries of the Github User</h1>
              <form className="form my-1" onSubmit={onSubmit}>
                 <input type="text" placeholder="Enter the github username" onChange={ (e)=> setUsername(e.target.value)} />
                 <button className="btn-primary"type="submit">Submit</button>
              </form>
          </div>
          <div className="container">
            <h2 className="text-primary my-1">
                <i className="fab fa-github"></i> Github Repos
            </h2>
            {loading ? <Spinner/> : (
                  repos.map(repo =>(
                    <Profile key={repo.id} repo={repo}/>
                ) )
            )}
            
          
           
          </div>
    </div>
  );
}

export default App;
