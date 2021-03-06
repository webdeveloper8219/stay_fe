import React from "react";
import { A } from "hookrouter";
import { DEFAULT_IMAGE } from "../../Common/constants";
import Star from "../common/Star";

const HotelList = ({ hotels, search, input }) => {
    let result = [];
    let i = 0;
    let j = 0;
    let space = true;
    for (i = 0; i < input.length; i++) {
        if (input[i] !== " ") {
            space = false;
            break;
        }
    }
    if (input.length === 0 || space === true) {
        result = hotels;
    } else if (search.length !== undefined && search.length !== 0) {
        result = [];
        for (i = 0; i < search.length; i++) {
            for (j = 0; j < hotels.length; j++) {
                if (search[i].id === hotels[j].id) {
                    result = result.concat(search[i]);
                }
            }
        }
    }

    if (result.length === 0) {
        return (
            <div>
                <br />
                <br />
                <div className="relative max-w-7xl mx-auto">
                    <div className="text-center">
                        <h3 className="text-3xl leading-9 tracking-tight font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
                            Sorry :)
                        </h3>
                        <p className="mt-3 max-w-2xl mx-auto text-xl leading-7 text-gray-500 sm:mt-4">
                            Unfortunately no hotels matched your search
                            parameters
                        </p>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className="hotelslist-center max-w-6xl mx-auto">
            <div className="mt-12 grid gap-5 max-w-lg mx-auto lg:grid-cols-4 md:grid-cols-3 md:max-w-none sm:mx-8">
                {result.map((item) => {
                    return (
                        <div key={item.id}>
                            <A
                                className="flex flex-col rounded-lg shadow-sm border overflow-hidden max-w-xs mx-auto hover:shadow-xl"
                                href={`/roomlist/${item.id}`}>
                                <div className="flex-shrink-0">
                                    <img
                                        className="h-48 w-full object-cover"
                                        src={
                                            (item.photos && item.photos[0]) ||
                                            DEFAULT_IMAGE.HOTEL
                                        }
                                        alt={item.name}
                                    />
                                </div>
                                <div className="block">
                                    <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                                        <div className="flex-1">
                                            <p className="text-sm leading-5 font-medium text-indigo-600 h-4">
                                                <span className="flex">
                                                    <Star
                                                        num={item.starCategory}
                                                        dim={4}
                                                    />
                                                </span>
                                            </p>
                                            <h3 className="mt-2 text-base truncate leading-7 font-semibold text-gray-900">
                                                {item.name}
                                            </h3>
                                            {/* <p className="mt-3 text-xl leading-6 text-gray-500">
                                            Rs. 18,000
                                       </p> */}
                                        </div>

                                        <div className="mt-6 flex items-center">
                                            <div className="ml-3">
                                                <p className="text-sm leading-5 font-medium text-gray-900">
                                                    {item.category}
                                                </p>
                                                <div className="flex text-sm leading-5 text-gray-500 h-24">
                                                    {/* <time dateTime="2020-03-16">
                                                Mar 16, 2020
                                            </time> */}
                                                    {item.district}
                                                    <br />
                                                    {item.address}
                                                    <span className="mx-1">
                                                        &middot;
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </A>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default HotelList;
