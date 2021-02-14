import axios from "axios";

// Actions
const GET_CAMPAIGNS_REQUESTED = "GET_CAMPAIGNS_REQUESTED";
const GET_CAMPAIGNS_SUCCEED = "GET_CAMPAIGNS_SUCCEED";
const GET_CAMPAIGNS_FAILED = "GET_CAMPAIGNS_FAILED";

// Action creators
export const getCampaigns = () => (dispatch) => {
    dispatch(getCampaignsRequested());

    axios.get("http://127.0.0.1:8000/api/campaigns/")
        .then((response) => {
            dispatch(getCampaignsSucceed(response.data));
        })
        .catch((error) => {
            dispatch(getCampaignsFailed(["Campaign fetching failed."]));
        });
};

export const getCampaignsRequested = () => {
    return {
        type: GET_CAMPAIGNS_REQUESTED,
        payload: {
            //
        }
    };
};

export const getCampaignsSucceed = (campaigns) => {
    return {
        type: GET_CAMPAIGNS_SUCCEED,
        payload: {
            campaigns: campaigns
        }
    };
};

export const getCampaignsFailed = (errors) => {
    return {
        type: GET_CAMPAIGNS_FAILED,
        payload: {
            errors: errors
        }
    };
};

// Reducers
const initialState = {
    campaigns: [],
    isLoading: false,
    errors: [],
};

const campaigns = (state = initialState, actions) => {
    switch (actions.type) {
        case GET_CAMPAIGNS_REQUESTED:
            return {
                ...state,
                isLoading: true,
            };
        case GET_CAMPAIGNS_SUCCEED:
            return {
                ...state,
                isLoading: false,
                campaigns: actions.payload.campaigns,
            };
        case GET_CAMPAIGNS_SUCCEED:
            return {
                ...state,
                isLoading: false,
                errors: actions.payload.errors,
            };

        default:
            return state;
    }
}

export default campaigns;
