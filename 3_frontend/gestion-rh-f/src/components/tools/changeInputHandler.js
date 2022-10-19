const changeInputHandler = (e, data, setData) =>{
    const newData = {...data};
    newData[e.target.name] = e.target.value;
    setData(newData);
}
export default changeInputHandler;