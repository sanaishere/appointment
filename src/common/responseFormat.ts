export function sendResponse(error:any,data:any){
    let result={
        "result":{
            "error_code":error.error_code||"",
            "error_message":error.error_message||"",
            "errors":error.errors||""
        },
         "data":data||''

    }
    return result
}