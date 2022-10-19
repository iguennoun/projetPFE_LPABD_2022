import axios from "axios";

const deleteObject = (url) =>{
    axios({
        url: url,
        method: 'DELETE',

    }).then(result =>{
        console.log(result.data)
        alert("Supprimer avec succès")
    }).catch(erreur =>{
        console.log(erreur.message)
        alert("Erreur : "+erreur.message)
    })
}

export default deleteObject;