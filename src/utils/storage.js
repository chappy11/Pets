export const KEY = {
    ACCOUNT:'Account',
}


export const save = async(data)=>{
    const payload = JSON.stringify(data);

    localStorage.setItem(KEY.ACCOUNT,data);
}

export const getItem = async(key) =>{
    const data = await localStorage.get(key);

    if(data){
        return JSON.parse(data)
    }

    return null;
}

export const remove = () =>{
    localStorage.clear();
}