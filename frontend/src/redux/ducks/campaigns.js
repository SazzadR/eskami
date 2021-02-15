import axios from "axios";

// Actions
const GET_CAMPAIGNS_REQUESTED = "GET_CAMPAIGNS_REQUESTED";
const GET_CAMPAIGNS_SUCCEED = "GET_CAMPAIGNS_SUCCEED";
const GET_CAMPAIGNS_FAILED = "GET_CAMPAIGNS_FAILED";

const GET_CAMPAIGN_REQUESTED = "GET_CAMPAIGN_REQUESTED";
const GET_CAMPAIGN_SUCCEED = "GET_CAMPAIGN_SUCCEED";
const GET_CAMPAIGN_FAILED = "GET_CAMPAIGN_FAILED";

const CREATE_CAMPAIGN_REQUESTED = "CREATE_CAMPAIGN_REQUESTED";
const CREATE_CAMPAIGN_SUCCEED = "CREATE_CAMPAIGN_SUCCEED";
const CREATE_CAMPAIGN_FAILED = "CREATE_CAMPAIGN_FAILED";
const RESET_CREATE_CAMPAIGN = "RESET_CREATE_CAMPAIGN";

const UPDATE_CAMPAIGN_REQUESTED = "UPDATE_CAMPAIGN_REQUESTED";
const UPDATE_CAMPAIGN_SUCCEED = "UPDATE_CAMPAIGN_SUCCEED";
const UPDATE_CAMPAIGN_FAILED = "UPDATE_CAMPAIGN_FAILED";
const RESET_EDIT_CAMPAIGN = "RESET_EDIT_CAMPAIGN";

const OPEN_CREATIVE_MODAL = "OPEN_CREATIVE_MODAL";
const CLOSE_CREATIVE_MODAL = "CLOSE_CREATIVE_MODAL";

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

export const getCampaign = (id) => (dispatch) => {
    dispatch(getCampaignRequested());

    axios.get(`http://127.0.0.1:8000/api/campaigns/${id}`)
        .then((response) => {
            dispatch(getCampaignSucceed(response.data));
        })
        .catch((error) => {
            dispatch(getCampaignFailed(["Campaign fetching failed."]));
        });
};

export const getCampaignRequested = () => {
    return {
        type: GET_CAMPAIGN_REQUESTED,
        payload: {
            //
        }
    };
};

export const getCampaignSucceed = (campaign) => {
    return {
        type: GET_CAMPAIGN_SUCCEED,
        payload: {
            campaign: campaign
        }
    };
};

export const getCampaignFailed = (errors) => {
    return {
        type: GET_CAMPAIGN_FAILED,
        payload: {
            errors: errors
        }
    };
};

export const createCampaign = (name, startDate, endDate, totalBudget, dailyBudget, images, onSuccess = () => "") => (dispatch) => {
    dispatch(createCampaignRequested());

    axios.post("http://127.0.0.1:8000/api/campaigns/", {
        name: name,
        start_date: startDate,
        end_date: endDate,
        total_budget: totalBudget,
        daily_budget: dailyBudget,
        images: images,
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


export const updateCampaign = (id, name, startDate, endDate, totalBudget, dailyBudget, images, onSuccess = () => "") => (dispatch) => {
    dispatch(updateCampaignRequested());

    axios.put(`http://127.0.0.1:8000/api/campaigns/${id}`, {
        name: name,
        start_date: startDate,
        end_date: endDate,
        total_budget: totalBudget,
        daily_budget: dailyBudget,
        images: images,
    })
        .then((response) => {
            dispatch(updateCampaignSucceed());

            onSuccess();
        })
        .catch((error) => {
            const errors = [];
            for (const [key, value] of Object.entries(error.response.data)) {
                errors.push(value)
            }

            dispatch(updateCampaignFailed(errors));
        });
};

export const updateCampaignRequested = () => {
    return {
        type: UPDATE_CAMPAIGN_REQUESTED,
        payload: {
            //
        }
    };
};

export const updateCampaignSucceed = () => {
    return {
        type: UPDATE_CAMPAIGN_SUCCEED,
        payload: {
            //
        }
    };
};

export const updateCampaignFailed = (errors) => {
    return {
        type: UPDATE_CAMPAIGN_FAILED,
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
};

export const resetEditCampaign = () => {
    return {
        type: RESET_EDIT_CAMPAIGN,
        payload: {
            //
        }
    };
};

export const openCreativesModal = (campaign) => {
    return {
        type: OPEN_CREATIVE_MODAL,
        payload: {
            campaignId: campaign.id
        },
    };
};

export const closeCreativesModal = (campaign) => {
    return {
        type: CLOSE_CREATIVE_MODAL,
        payload: {
            campaignId: campaign.id
        },
    };
};

// Reducers
const initialState = {
    campaigns: [],
    currentCampaign: {},
    isLoading: false,
    errors: {
        list: [],
        create: [],
        edit: [],
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
                campaigns: actions.payload.campaigns.map((campaign) => {
                    campaign.showCreatives = false;

                    return campaign;
                }),
            };
        case GET_CAMPAIGNS_FAILED:
            return {
                ...state,
                isLoading: false,
                errors: actions.payload.errors,
            };

        case GET_CAMPAIGN_REQUESTED:
            return {
                ...state,
                isLoading: true,
            };
        case GET_CAMPAIGN_SUCCEED:
            return {
                ...state,
                isLoading: false,
                currentCampaign: {
                    id: actions.payload.campaign.id,
                    name: actions.payload.campaign.name,
                    startDate: actions.payload.campaign.start_date,
                    endDate: actions.payload.campaign.end_date,
                    totalBudget: actions.payload.campaign.total_budget,
                    dailyBudget: actions.payload.campaign.daily_budget,
                    images: actions.payload.campaign.creatives.map(image => image.path),
                },
            };
        case GET_CAMPAIGN_FAILED:
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

        case RESET_EDIT_CAMPAIGN:
            return {
                ...state,
                currentCampaign: {},
                errors: {
                    ...state.errors,
                    edit: [],
                }
            };

        case OPEN_CREATIVE_MODAL:
            return {
                ...state,
                campaigns: state.campaigns.map((campaign) => {
                    campaign.showCreatives = false;

                    campaign.showCreatives = campaign.id === actions.payload.campaignId;

                    return campaign;
                })
            };
        case CLOSE_CREATIVE_MODAL:
            return {
                ...state,
                campaigns: state.campaigns.map((campaign) => {
                    campaign.showCreatives = false;

                    return campaign;
                })
            };

        default:
            return state;
    }
}

export default campaigns;
