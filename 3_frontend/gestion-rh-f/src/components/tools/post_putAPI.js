import axios from "axios";

const submitForm = (e, url,data,method='POST') =>{
    e.preventDefault();
    axios({
        url: url,
        method: method,
        data: data,

    }).then(result =>{
        console.log(result.data)
        alert("Ajouter avec succès")
    }).catch(erreur =>{
        console.log(erreur.message)
        alert("Erreur : "+erreur.message)
    })
}

export default submitForm;