import axios from "axios";

// Actions
const GET_CAMPAIGNS_REQUESTED = "GET_CAMPAIGNS_REQUESTED";
const GET_CAMPAIGNS_SUCCEED = "GET_CAMPAIGNS_SUCCEED";
const GET_CAMPAIGNS_FAILED = "GET_CAMPAIGNS_FAILED";

const CREATE_CAMPAIGN_REQUESTED = "CREATE_CAMPAIGN_REQUESTED";
const CREATE_CAMPAIGN_SUCCEED = "CREATE_CAMPAIGN_SUCCEED";
const CREATE_CAMPAIGN_FAILED = "CREATE_CAMPAIGN_FAILED";
const RESET_CREATE_CAMPAIGN = "RESET_CREATE_CAMPAIGN";

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

export const createCampaign = (name, startDate, endDate, totalBudget, dailyBudget, onSuccess = () => "") => (dispatch) => {
    dispatch(createCampaignRequested());

    axios.post("http://127.0.0.1:8000/api/campaigns/", {
        name: name,
        start_date: startDate,
        end_date: endDate,
        total_budget: totalBudget,
        daily_budget: dailyBudget,
    })
        .then((response) => {
            dispatch(createCampaignSucceed());

            onSuccess();
        })
        .catch((error) => {
            const errors = [];
            for (const [key, value] of Object.entries(error.response.data)) {
                errors.push(value)
            }

            dispatch(createCampaignFailed(errors));
        });
};

export const createCampaignRequested = () => {
    return {
        type: CREATE_CAMPAIGN_REQUESTED,
        payload: {
            //
        }
    };
};

export const createCampaignSucceed = () => {
    return {
        type: CREATE_CAMPAIGN_SUCCEED,
        payload: {
            //
        }
    };
};

export const createCampaignFailed = (errors) => {
    return {
        type: CREATE_CAMPAIGN_FAILED,
        payload: {
            errors: errors,
        }
    };
};

export const resetCreateCampaign = () => {
    return {
        type: RESET_CREATE_CAMPAIGN,
        payload: {
            //
        }
    };
}

// Reducers
const initialState = {
    campaigns: [],
    isLoading: false,
    errors: {
        list: [],
        create: [],
    },
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
        case GET_CAMPAIGNS_FAILED:
            return {
                ...state,
                isLoading: false,
                errors: actions.payload.errors,
            };

        case CREATE_CAMPAIGN_REQUESTED:
            return {
                ...state,
                isLoading: true,
            };
        case CREATE_CAMPAIGN_SUCCEED:
            return {
                ...state,
                isLoading: false,
            };
        case CREATE_CAMPAIGN_FAILED:
            return {
                ...state,
                isLoading: false,
                errors: {
                    ...state.errors,
                    create: actions.payload.errors,
                }
            };
        case RESET_CREATE_CAMPAIGN:
            return {
                ...state,
                errors: {
                    ...state.errors,
                    create: [],
                }
            };

        default:
            return state;
    }
}

export default campaigns;
