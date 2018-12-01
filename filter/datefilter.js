export function formatdate(val,format){
    let data =new Date(val)
    
    if(format == 'date'){
        let month =data.getMonth()+1
        let day = data.getDate()
        return month+'月'+day+'日'
    }
   else if(format == 'week'){
       let weekarr =  ['一', '二', '三', '四', '五', '六', '日'];
       let week = data.getDay()
       return '星期'+weekarr[week-1]
   }
}