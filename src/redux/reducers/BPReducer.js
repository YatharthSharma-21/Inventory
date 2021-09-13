import {
  ADD_ITEM,
  ADD_ITEM_ERROR,
  UPDATE_ITEM,
  UPDATE_ITEM_ERROR,  
  GET_PARTNERS,
  GET_PARTNER_ERROR,  
  RESET
} from "../constants/BPTypes";

const initialState = {
  items: [], 
  error: {},
};

const BPReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_ITEM:
      return {
        ...state,
        item: payload,
        items: [...state.items, payload],
      };
    case UPDATE_ITEM:
      return {
        ...state,
        items: [
          ...state.items.filter((part) => part._id !== payload._id),
          payload,
        ],
      };
   
    case GET_PARTNERS:
      return {
        ...state,
        partners: payload,
        fetched: { ...state.fetched, partners: true },
      };
    
    case ADD_ITEM_ERROR:
    case UPDATE_ITEM_ERROR:   
    case GET_PARTNER_ERROR:    
      return {
        ...state,
        // error: payload,
      };
    case RESET:
      return {
        ...state,
        partners: [],
        partner: {},
        shipments: [],
        samples: [],
        testTypes: [],
        fetched: { partners: false, shipments: false, samples: false },
        error: {},
      };
    default:
      return state;
  }
};

export default BPReducer;
