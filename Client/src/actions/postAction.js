import * as PostApi from "../api/PostRequest"

export const getTimelinePosts=(id)=>async (dispatch)=>{
    dispatch({type:"RETREVING_START"})
    try {
        const {data} =await PostApi.getTimelinePosts(id);
        dispatch({type:"RETREVING_SUCCESS",data:data})
        console.log();
    } catch (error) {
        dispatch({type:"RETREVING_FAIL"})
        console.log(error);
    }
}