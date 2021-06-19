import React, { useState } from 'react';
import TableDropdown from "../../components/Dropdowns/TableDropdown";
import CancelIcon from '@material-ui/icons/Cancel';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import moment from 'moment';


import VisibilityIcon from '@material-ui/icons/Visibility';
import { Avatar } from '@material-ui/core';
const Appcomp = (props) => {
    const [mo, setmo] = useState(false);
    const closemo = () => { setmo(false); };

    return (<tr>

        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left flex items-center">

            <span
                className={
                    "ml-3 font-bold "

                }
            >
                {props.name}

            </span>
        </th>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
            {props.title}
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
            <i className="fas fa-circle text-orange-500 mr-2"></i> {props.status}
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
            <div className="flex">
                {props.date}
            </div>
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
            <div className="flex">
                {props.appdate}
            </div>
        </td>

    </tr>);
}

export default Appcomp;