import axios from "axios"; 

export const validateUser = async (token) => {
    try {
        const res = await axios.get(`http://localhost:4000/api/users/login`, { 
            headers : {
                Authorization : "Bearer " + token,
            },
        })
        return res.data;
    } catch (error) {
        
    }
}