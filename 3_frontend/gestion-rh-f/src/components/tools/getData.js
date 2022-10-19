import axios from "axios";

const getData = (url,setObject) =>{
    axios.get(url)
    .then(result=>{
        setObject(result.data);
    })
    .catch(error=>{
        console.log(error.message);
    });
}

export default getData;