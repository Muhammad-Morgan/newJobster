import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
export const userAuth = ({ updateInfo, showAlert, navigate }) => {
    const lToken = localStorage.getItem('lToken')
    axios.get(`https://new-jobster-server.vercel.app/user/auth?token=${lToken}`).then(({ data }) => {
        const { type, msg } = data;
        if (type === 'danger') {
            navigate('/login')
            showAlert({ msg, type });
        } else {
            const myData = jwtDecode(data.myToken);
            const { name, myID } = myData;
            updateInfo({
                name,
                myID,
                type: myData.type
            })
        }
    }).catch(err => console.log(err))
}
export const updateUser = ({ setUser, user,lToken}) => {
    const myData = jwtDecode(lToken);
    const {myID} = myData;
    axios.get(`https://new-jobster-server.vercel.app/user/getuser?myID=${myID}`).then(({ data }) => {
        const { result } = data;
        if (result) {
            setUser({
                ...user,
                name: result.name,
                lastname: result.lastname,
                location: result.location,
                email: result.email
            })
        }
    }).catch(err => console.log(err))
}