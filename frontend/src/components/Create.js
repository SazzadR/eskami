import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { createCampaign, resetCreateCampaign } from "../redux/ducks/campaigns";

class Create extends Component {
    state = {
        name: "",
        startDate: "",
        endDate: "",
        totalBudget: 0,
        dailyBudget: 0,
        images: null,
    };

    componentWillUnmount() {
        const { dispatch } = this.props;

        dispatch(resetCreateCampaign());
    }

    handleChange = (ev) => {
        this.setState({
            [ev.target.name]: ev.target.value,
        });
    };

    handleSubmit = (ev) => {
        const { dispatch, history } = this.props;
        const { name, startDate, endDate, totalBudget, dailyBudget, images } = this.state;

        ev.preventDefault();

        dispatch(createCampaign(name, startDate, endDate, totalBudget, dailyBudget, images, () => history.push("/")));
    };

    handleCreativeUpload = (ev) => {
        const counter = ev.target.files.length;
        const outputDiv = window.document.getElementById("preview");
        const images = [];

        for (let i = 0; i < counter; i++) {
            const reader = new FileReader();

            reader.onload = (ev) => {
                const image = ev.target.result;
                const imageElement = window.document.createElement("img");
                imageElement.setAttribute("src", image);
                imageElement.setAttribute("class", "border border-black");
                outputDiv.appendChild(imageElement);

                images.push(image);
            };

            reader.readAsDataURL(ev.target.files[i]);

            this.setState({
                images: images,
            });
        }
    };

    render() {
        const { errors } = this.props;
        const { name, startDate, endDate, totalBudget, dailyBudget } = this.state;

        return (
            <div className="py-4 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
                <h2 className="text-2xl font-bold">Create Campaign</h2>

                <div className="mt-8">
                    {errors.length > 0 &&
                        <ul className="text-red-600 mb-4 list-decimal">
                        {errors.map((error, index) => {
                            return (
                                <li key={index}>{error}</li>
                            );
                        })}
                    </ul>
                    }

                    <form onSubmit={this.handleSubmit}>
                        <div className="grid grid-cols-2 gap-6">

                            <div className="grid grid-cols-1 gap-6">
                            <label className="block">
                                <span className="text-gray-700">Name</span>
                                <input
                                    type="text"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    name="name"
                                    value={name}
                                    onChange={this.handleChange}
                                />
                            </label>
                            <label className="block">
                                <span className="text-gray-700">Start Date</span>
                                <input
                                    type="date"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    name="startDate"
                                    value={startDate}
                                    onChange={this.handleChange}
                                />
                            </label>
                            <label className="block">
                                <span className="text-gray-700">End Date</span>
                                <input
                                    type="date"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    name="endDate"
                                    value={endDate}
                                    onChange={this.handleChange}
                                />
                            </label>
                            <label className="block">
                                <span className="text-gray-700">Total Budget</span>
                                <input
                                    type="number"
                                    min="0"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    name="totalBudget"
                                    value={totalBudget}
                                    onChange={this.handleChange}
                                />
                            </label>
                            <label className="block">
                                <span className="text-gray-700">Daily Budget</span>
                                <input
                                    type="number"
                                    min="0"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    name="dailyBudget"
                                    value={dailyBudget}
                                    onChange={this.handleChange}
                                />
                            </label>
                            <label className="block">
                                <span className="text-gray-700">Creative Uploads</span>
                                <input
                                    type="file"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    accept=".png, .jpg, .jpeg"
                                    multiple={true}
                                    onChange={this.handleCreativeUpload}
                                />
                            </label>
                            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                                Submit
                            </button>
                        </div>

                            <div>
                                <div id="preview" className="grid grid-cols-3 gap-2" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { campaigns } = state;

    return {
        errors: campaigns.errors["create"]
    };
};

export default withRouter(connect(mapStateToProps)(Create));
