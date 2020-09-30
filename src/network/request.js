import axios from 'axios'

// export function requset(congig){
//     return new Promise((resolve,reject)=>{
//     //创建axios的实例
//     const instance =axios.create({
//         baseURL:'"http://152.136.185.210:8000/api/z8',
//         timeout:5000
//     })
//     //发送真正的网络请求
//     instance(config)
//        .then(res=>{
//            resolve(res)
//        })
//        .catch(err=>{
//            reject(err)
//        })
//     })
// }
export function request(config){
    
    //创建axios的实例
    const instance =axios.create({
        baseURL:'http://152.136.185.210:8000/api/w6',
        timeout:5000
    })


    //axios的拦截器
    instance.interceptors.request.use(config=>{
        
        return config
    },err=>{
        console.log(err);
    })
    //相应拦截
    instance.interceptors.response.use(res=>{
        return res.data
    },err=>{
        console.log(err);
    })
    //发送真正的网络请求
     return instance(config)
       
    
}