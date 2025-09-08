import "./Menu.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import TuneIcon from '@mui/icons-material/Tune';
import { filterArray } from "../../../Models/Filters";
import { notify } from "../../../utils/Notify";
import { ChangeEvent } from "react";
export function Menu() {

    async function filterOption(selectedFilter: ChangeEvent<HTMLSelectElement>) {
        try {
     







            
        } catch (err: any) {
            notify.error(err);
        }
    }

    return (
        <div className="Menu">
            <span className="filter-section">
                <TuneIcon />
                <select className="select-filter"
                    defaultValue=""
                    onChange={(selectedFilter) => {filterOption(selectedFilter) }} required><option value="" disabled>  Filter by</option>
                    {
                        filterArray.map(({ value, label}) => (
                            <option key={value} value={value}>
                                {label}
                                </option>
                          )
                        )
                    }
                </select>
            </span>
        </div>
    );
}
