import React, { useState, useEffect } from 'react';
import Appcomponent from "./appli"

import firebase from '../../firebase';
const Applied = ({ color = "light" }) => {
    const [appli, setappli] = useState(null)
    useEffect(() => {
        const fetchdata = async () => {
            const db = firebase.firestore()
            const currentuser = firebase.auth().currentUser.uid
            const gp = db.collection("user/" + currentuser + "/appliedjobs")
            const data = gp.onSnapshot(snap => {
                const d = snap.docs.map(doc => doc.data())
                setappli(d)
                console.log("this is nanak")
                console.log(d)
            })
        }

        fetchdata()
    }, [])

    return (<>

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
                            Applied Internships
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
                                Company name
                  </th>
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
                                Intenship created Date
                  </th>
                            <th
                                className={
                                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " +
                                    (color === "light"
                                        ? "bg-gray-100 text-gray-600 border-gray-200"
                                        : "bg-blue-800 text-blue-300 border-blue-700")
                                }
                            >
                                Applied date
                  </th>

                        </tr>
                    </thead>
                    <tbody>
                        {appli !== null ?


                            appli.map((item) => (

                                <Appcomponent
                                    name={item.companyname} title={item.title} status={item.status}
                                    date={item.createddate} appdate={item.applieddate}
                                />

                            ))




                            : <div>No applied</div>
                        }
                    </tbody>
                </table>
            </div>
        </div>




    </>

    );
}

export default Applied;