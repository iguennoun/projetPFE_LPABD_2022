import axios from "axios";

const loadPages = (pageNumber, total, size, setObject, url)=>{
    const max_pages = Math.ceil(total/size);
    if (pageNumber>0 && pageNumber <= max_pages){
        url+= "&page="+pageNumber;
        axios.get(url).then(result=>{
            setObject(result.data);
        }).catch(error=>{
            console.log(error.message)
        });
    }
}

export default loadPages;