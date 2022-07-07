
export default function useUrlId(url){

    const splitUrl = url.toString().split("/");
    
    const roomId = splitUrl[splitUrl.length - 1];

    return {roomId};
};