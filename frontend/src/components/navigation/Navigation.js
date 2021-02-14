import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

class Navigation extends Component {
    render() {
        return (
            <nav className="bg-gray-800">
                <div className="max-w-full mx-auto px-2 sm:px-6 lg:px-8">
                    <div className="relative flex items-center justify-between h-16">
                        <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex-shrink-0 flex items-center">
                                <img className="block lg:hidden h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow" />
                                <img className="hidden lg:block h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg" alt="Workflow" />
                            </div>
                            <div className="hidden sm:block sm:ml-6">
                                <div className="flex space-x-4">
                                    <Link
                                        className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                                        to="/"
                                    >
                                        Home
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <Link
                            className="bg-purple-500 text-grey-darkest font-bold py-2 px-4 rounded inline-flex items-center gap-2"
                            to="/create"
                        >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 7H9V1C9 0.734784 8.89464 0.48043 8.70711 0.292893C8.51957 0.105357 8.26522 0 8 0C7.73478 0 7.48043 0.105357 7.29289 0.292893C7.10536 0.48043 7 0.734784 7 1V7H1C0.734784 7 0.48043 7.10536 0.292893 7.29289C0.105357 7.48043 0 7.73478 0 8C0 8.26522 0.105357 8.51957 0.292893 8.70711C0.48043 8.89464 0.734784 9 1 9H7V15C7 15.2652 7.10536 15.5196 7.29289 15.7071C7.48043 15.8946 7.73478 16 8 16C8.26522 16 8.51957 15.8946 8.70711 15.7071C8.89464 15.5196 9 15.2652 9 15V9H15C15.2652 9 15.5196 8.89464 15.7071 8.70711C15.8946 8.51957 16 8.26522 16 8C16 7.73478 15.8946 7.48043 15.7071 7.29289C15.5196 7.10536 15.2652 7 15 7Z" fill="#212B36" />
                            </svg>
                            <span>Create</span>
                        </Link>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navigation;
