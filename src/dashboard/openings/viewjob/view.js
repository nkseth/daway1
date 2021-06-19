import React, { useEffect, useState } from 'react';
import Viewcom from './viewcom'
import firebase from 'firebase'

import PropTypes from "prop-types";

const CardTable = ({ color }) => {
    const [jobs, setjobs] = useState([])
    useEffect(() => {
        const fet = async () => {
            const db = firebase.firestore()
            const currentUser = firebase.auth().currentUser.uid
            const da = await db.collection('companies/' + currentUser + '/postedjobs')

            da.onSnapshot(snap => {
                const data = snap.docs.map(doc => doc.data())

                setjobs(data)
            })

        }
        fet()

    }, [])
    return (<>
        {
            jobs.length > 0 ?
                <div
                    className={
                        "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
                        (color === "light" ? "bg-white" : "bg-blue-900 text-white")
                    }
                >
                    <div className="rounded-t mb-0 px-4 py-3 border-0">
                        <div className="flex flex-wrap items-center">
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                <h3
                                    className={
                                        "font-semibold text-lg " +
                                        (color === "light" ? "text-gray-800" : "text-white")
                                    }
                                >
                                    Open Internships
                    </h3>
                            </div>
                        </div>
                    </div>
                    <div className="block w-full overflow-x-auto">
                        {/* Projects table */}
                        <table className="items-center w-full bg-transparent border-collapse">
                            <thead>
                                <tr>
                                    <th
                                        className={
                                            "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " +
                                            (color === "light"
                                                ? "bg-gray-100 text-gray-600 border-gray-200"
                                                : "bg-blue-800 text-blue-300 border-blue-700")
                                        }
                                    >
                                        Internship Title
                      </th>
                                    <th
                                        className={
                                            "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " +
                                            (color === "light"
                                                ? "bg-gray-100 text-gray-600 border-gray-200"
                                                : "bg-blue-800 text-blue-300 border-blue-700")
                                        }
                                    >
                                        Location
                      </th>
                                    <th
                                        className={
                                            "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " +
                                            (color === "light"
                                                ? "bg-gray-100 text-gray-600 border-gray-200"
                                                : "bg-blue-800 text-blue-300 border-blue-700")
                                        }
                                    >
                                        Category
                      </th>
                                    <th
                                        className={
                                            "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " +
                                            (color === "light"
                                                ? "bg-gray-100 text-gray-600 border-gray-200"
                                                : "bg-blue-800 text-blue-300 border-blue-700")
                                        }
                                    >
                                        Date
                      </th>
                                    <th
                                        className={
                                            "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " +
                                            (color === "light"
                                                ? "bg-gray-100 text-gray-600 border-gray-200"
                                                : "bg-blue-800 text-blue-300 border-blue-700")
                                        }
                                    >
                                        Status
                      </th>
                                    <th
                                        className={
                                            "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " +
                                            (color === "light"
                                                ? "bg-gray-100 text-gray-600 border-gray-200"
                                                : "bg-blue-800 text-blue-300 border-blue-700")
                                        }
                                    >
                                        Action
                                        </th>
                                </tr>
                            </thead>
                            <tbody>

                                {jobs.map((item, index) => (

                                    <Viewcom id={index}
                                        title={item.title}
                                        location={item.location}
                                        createddate={item.createddate}
                                        category={item.category}
                                        jobduration={item.jobduration}
                                        jobtype={item.jobtype}
                                        jobstatus={item.status}
                                        postid={item.id}
                                        companyid={item.companyid}
                                        appdata={item}
                                    />
                                ))}

                            </tbody>
                        </table>
                    </div>
                </div>
                : null}
    </>
    );
}

CardTable.defaultProps = {
    color: "light",
};

CardTable.propTypes = {
    color: PropTypes.oneOf(["light", "dark"]),
};

export default CardTable;