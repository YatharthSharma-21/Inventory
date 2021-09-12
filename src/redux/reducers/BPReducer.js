import {
  CREATE_PARTNER,
  CREATE_PARTNER_ERROR,
  UPDATE_PARTNER,
  UPDATE_PARTNER_ERROR,
  UPDATE_SETTINGS,
  UPDATE_SETTINGS_ERROR,
  GET_PARTNERS,
  GET_PARTNER_ERROR,
  SETUP_PARTNER,
  SETUP_PARTNER_ERROR,
  GET_SAMPLES,
  GET_SAMPLES_ERROR,
  CREATE_SAMPLE,
  CREATE_SAMPLE_ERROR,
  UPDATE_SAMPLE,
  UPDATE_SAMPLE_ERROR,
  GET_REPORT_TYPES,
  GET_REPORT_TYPES_ERROR,
  CREATE_SHIPMENT,
  GET_SHIPMENT,
  GET_SHIPMENT_ERROR,
  CREATE_SHIPMENT_ERROR,
  SET_SHIPMENT_STATUS,
  SET_SHIPMENT_STATUS_ERROR,
  DELETE_SAMPLE,
  DELETE_SAMPLE_ERROR,
  RESET,
  GET_REQUESTED_KITS,
  GET_KITS_ERROR,
  UPDATE_KIT_REQUEST,
  UPDATE_KIT_REQUEST_ERROR,
} from "../constants/BPTypes";

const initialState = {
  partners: [],
  partner: {},
  shipments: { ships: [], page: 1, pages: 1 },
  samples: { samps: [], page: 1, pages: 1 },
  testTypes: [],
  kits: [],
  fetched: { partners: false, shipments: false, samples: false },
  error: {},
};

const BPReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_PARTNER:
      return {
        ...state,
        partner: payload,
        partners: [...state.partners, payload],
      };
    case UPDATE_PARTNER:
      return {
        ...state,
        partners: [
          ...state.partners.filter((part) => part._id !== payload._id),
          payload,
        ],
      };
    case UPDATE_SETTINGS:
      return {
        ...state,
        partners: [
          ...state.partners.filter((part) => part._id !== payload._id),
          payload,
        ],
      };
    case GET_PARTNERS:
      return {
        ...state,
        partners: payload,
        fetched: { ...state.fetched, partners: true },
      };
    case SETUP_PARTNER:
      return {
        ...state,
      };
    case GET_SAMPLES:
      return {
        ...state,
        samples: { ...payload },
        fetched: { ...state.fetched, samples: true },
      };
    case CREATE_SAMPLE:
      return {
        ...state,
        samples: { ...state.samples, samps: [...state.samples.samps, payload] },
      };
    case UPDATE_SAMPLE:
      return {
        ...state,
        samples: {
          ...state.samples,
          samps: [
            ...state.samples.samps.map((sample) =>
              sample._id === payload._id ? payload : sample
            ),
          ],
        },
      };
    case GET_REPORT_TYPES:
      return {
        ...state,
        testTypes: payload,
      };
    case GET_REQUESTED_KITS:
      return {
        ...state,
        kits: payload,
      };
    case UPDATE_SAMPLE:
      return {
        ...state,
        kits: [
          ...state.kits.map((kit) => (kit._id === payload._id ? payload : kit)),
        ],
      };
    case GET_SHIPMENT:
      return {
        ...state,
        shipments: { ...payload },
        fetched: { ...state.fetched, shipments: true },
      };
    case CREATE_SHIPMENT:
      return {
        ...state,
        shipments: {
          ...state.shipments,
          ships: [...state.shipments.ships, payload],
        },
        samples: {
          ...state.samples,
          samps: [
            ...state.samples.samps.map((sample) => {
              const s = payload.samples.find((samp) => sample._id === samp._id);
              if (!s) return sample;
              s.shipped = true;
              return s;
            }),
          ],
        },
      };
    case SET_SHIPMENT_STATUS:
      return {
        ...state,
        shipments: {
          ...state.shipments,
          ships: [
            state.shipments.ships.map((ship) => {
              if (ship._id === payload._id) return payload;
              return ship;
            }),
          ],
        },
      };
    case DELETE_SAMPLE:
      return {
        ...state,
        samples: {
          ...state.samples,
          samps: [
            state.samples.samps.filter((sample) => sample._id !== payload),
          ],
        },
      };
    case CREATE_PARTNER_ERROR:
    case UPDATE_PARTNER_ERROR:
    case UPDATE_SETTINGS_ERROR:
    case GET_PARTNER_ERROR:
    case SETUP_PARTNER_ERROR:
    case GET_SAMPLES_ERROR:
    case CREATE_SAMPLE_ERROR:
    case UPDATE_SAMPLE_ERROR:
    case GET_REPORT_TYPES_ERROR:
    case GET_SHIPMENT_ERROR:
    case CREATE_SHIPMENT_ERROR:
    case SET_SHIPMENT_STATUS_ERROR:
    case DELETE_SAMPLE_ERROR:
    case GET_KITS_ERROR:
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
