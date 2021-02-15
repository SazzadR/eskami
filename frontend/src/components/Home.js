import React, { Component } from "react";
import { connect } from "react-redux";

import Modal from "./common/modal/Modal";
import { getCampaigns, openCreativesModal, closeCreativesModal } from "../redux/ducks/campaigns";
import { Link } from "react-router-dom";

class Home extends Component {
    componentDidMount() {
        const { dispatch } = this.props;

        dispatch(getCampaigns());
    }

    openCreativesModal = (campaign) => {
        const { dispatch } = this.props;

        dispatch(openCreativesModal(campaign));
    };

    handleCreativeModalClose = (campaign) => {
        const { dispatch } = this.props;

        dispatch(closeCreativesModal(campaign));
    };

    render() {
        const { isLoading, campaigns } = this.props;

        return (
            <div className="py-4 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
                {isLoading && <h1 className="text-2xl">Loading...</h1>}

                {!isLoading &&
                <div
                    className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg"
                >
                    <table className="min-w-full">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                                    Serial
                                </th>
                                <th
                                    className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider"
                                >
                                    Name
                                </th>
                                <th
                                    className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider"
                                >
                                    Start Date
                                </th>
                                <th
                                    className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider"
                                >
                                    End Date
                                </th>
                                <th
                                    className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider"
                                >
                                    Total Budget
                                </th>
                                <th
                                    className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider"
                                >
                                    Daily Budget
                                </th>
                                <th className="px-6 py-3 border-b-2 border-gray-300"/>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {campaigns.map((campaign, index) => {
                                const isLastRow = campaigns.length == (index + 1);

                                return (
                                    <tr key={index}>
                                        <td className={`px-6 py-4 whitespace-no-wrap ${!isLastRow ? " border-b border-gray-500" : ""}`}>
                                            <div className="flex items-center">
                                                <div>
                                                    <div className="text-sm leading-5 text-gray-800">#{++index}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className={`px-6 py-4 whitespace-no-wrap ${!isLastRow ? " border-b border-gray-500" : ""}`}>
                                            <div className="text-sm leading-5 text-blue-500 underline">
                                                <Link to={`/campaign/${campaign.id}`}>
                                                    {campaign.name}
                                                </Link>
                                            </div>
                                        </td>
                                        <td className={`px-6 py-4 whitespace-no-wrap text-blue-900 text-sm leading-5 ${!isLastRow ? " border-b border-gray-500" : ""}`}>
                                            {campaign.start_date}
                                        </td>
                                        <td className={`px-6 py-4 whitespace-no-wrap text-blue-900 text-sm leading-5 ${!isLastRow ? " border-b border-gray-500" : ""}`}>
                                            {campaign.end_date}
                                        </td>
                                        <td className={`px-6 py-4 whitespace-no-wrap text-blue-900 text-sm leading-5 ${!isLastRow ? " border-b border-gray-500" : ""}`}>
                                            ${campaign.total_budget}
                                        </td>
                                        <td className={`px-6 py-4 whitespace-no-wrap text-blue-900 text-sm leading-5 ${!isLastRow ? " border-b border-gray-500" : ""}`}>
                                            ${campaign.daily_budget}
                                        </td>
                                        <td className={`px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 ${!isLastRow ? " border-b border-gray-500" : ""}`}>
                                            <Modal
                                                activator={
                                                    <button
                                                        className="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none"
                                                        onClick={() => this.openCreativesModal(campaign)}
                                                    >
                                                        Creative Preview
                                                    </button>
                                                }
                                                isOpen={campaign.showCreatives}
                                                onClose={() => this.handleCreativeModalClose(campaign)}
                                                title={`Creatives for: ${campaign.name}`}
                                            >
                                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
                                                    {campaign.creatives.map((image, index) => {
                                                        return (
                                                            <img key={index} src={`http://127.0.0.1:8000/${image.path}`} alt={campaign.name} />
                                                        );
                                                    })}


                                                </div>
                                            </Modal>

                                        </td>
                                    </tr>

                                );
                            })}

                        </tbody>
                    </table>
                </div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { campaigns } = state;

    return {
        isLoading: campaigns.isLoading,
        campaigns: campaigns.campaigns,
    };
};

export default connect(mapStateToProps)(Home);
