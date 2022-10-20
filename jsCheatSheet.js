export {JS};
class JS{
    //?getURL
    static GetURLPramas = (url)=>{
        return JSON.parse(`{"${url.split("?")[1].replace(/"/g,'\\"').replace(/&/g,'","').replace(/=/g,'":"')}"}`);
    }

    //? thousand separator
    static TSeparator = (num_data)=>{
    
        let num = num_data.toString();
        let n_len =  num.length;
        
        let format1 = `${num.slice(0,1)}.${num.slice(1,4)}`;
        let format2 = `${num.slice(0,2)}.${num.slice(2,4)}`;
        let format3 = `${num.slice(0,3)}.${num.slice(3,4)}`;
        
        return (n_len==7)?`${format1} million`
                :(n_len==8)?`${format2} million`
                :(n_len==9)?`${format3} million`
                :(n_len==10)?`${format1} billion`
                :(n_len==11)?`${format2} billion`
                :(n_len==12)?`${format3} billion`
                :num_data.toLocaleString();
        }

    // ?object iteration
    static IterateObject = (obj) =>
    {
        let arr = [];
        for(let item of Object.entries(obj))
        {
            arr.push(item[1]);
            // arr+=`${item[1]},`;
        }
        return arr;
    }

    static IterateObjectKeys = (objKey) =>
    {
        let key = "";
        for(let item of Object.keys(objKey))
        {
            key = item;
            break;
        }
        return key;
    }

    // ?line break for array
    static LineBreakArray= (arr) =>{
        var value="";
        arr.forEach(item=>{value+=`${item}<br>`;});
        return value;
    }

}

