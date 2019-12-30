import axios from 'axios'

export default getSellerAPI = ()=>{
    axios.get('http://192.168.1.62:4000/api/seller/info?offset='+this.state.offset+'&limit=20')
    .then((res)=>{
        return res
    })
}

