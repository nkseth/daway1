import React, { useEffect, useState } from 'react';
import TableDropdown from "../../components/Dropdowns/TableDropdown";
import PropTypes from "prop-types";
import Appcomponent from "./appcomp"
import firebase from 'firebase'
const CardTable = ({ color }) => {
    const [applieduser, setapplieduser] = useState([])
    const [applieduserid, setapplieduserid] = useState([])

    useEffect(() => {
        const fetuserdetails = async () => {
            const db = firebase.firestore()
            const currentuser = firebase.auth().currentUser.uid
            const papl = await db.collection("companies/" + currentuser + "/applieduser").onSnapshot(snap => {
                if (snap.docs.length > 0) {
                    const lipi = snap.docs.map(doc => doc.data())
                    const lipiid = snap.docs.map(doc => doc.id)
                    setapplieduser(lipi)
                    setapplieduserid(lipiid)
                }


            })
        }
        fetuserdetails()
    }, [])
    return (<>
        {
            applieduser.length > 0 ?
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
                                    Applicants
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
                                        Applied user
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
                                        Applied Date
                  </th>
                                    <th
                                        className={
                                            "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " +
                                            (color === "light"
                                                ? "bg-gray-100 text-gray-600 border-gray-200"
                                                : "bg-blue-800 text-blue-300 border-blue-700")
                                        }
                                    >
                                        Skill level
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

                                {applieduser.map((item, index) => (

                                    <Appcomponent
                                        name={item.userresume.displayname} title={item.title} status={item.status}
                                        date={item.applieddate} appdata={item.userresume} appliedid={applieduserid[index]}
                                        internshipdata={item}

                                    />

                                ))


                                }


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