import React, { Component } from "react";
import { connect } from "react-redux";

import { getCampaigns } from "../redux/ducks/campaigns";

class Home extends Component {
    componentDidMount() {
        const { dispatch } = this.props;

        dispatch(getCampaigns());
    }

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
                                <th className="px-6 py-3 border-b-2 border-gray-300"></th>
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
                                            <div className="text-sm leading-5 text-blue-900">{campaign.name}</div>
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
                                            <button
                                                className="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none"
                                            >
                                                Preview
                                            </button>
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
