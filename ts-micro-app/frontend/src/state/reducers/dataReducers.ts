const initialState = {
    data: [],
    loading: true
}

const dataReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case "getAll":
            return {
                ... state,
                allData: action.payload,
                loading: false
            }
        default: 
            return state    
    }
}

export default dataReducer;