import "./Menu.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import TuneIcon from '@mui/icons-material/Tune';
import { filterArray, Filters } from "../../../Models/Filters";
import { notify } from "../../../utils/Notify";
import { ChangeEvent } from "react";
import { vacationService } from "../../../Services/VacationService";
export function Menu() {

    async function filterOption(e: ChangeEvent<HTMLSelectElement>) {
        try {

            const filter = Number(e.target.value) as Filters;
            let data;

            switch (filter) {
                case Filters.LIKED:
                    data = await vacationService.getLikedVacations();
                    break;

                case Filters.ACTIVE_DATE:
                    data = await vacationService.getActiveVacations();
                    break;

                case Filters.IN_THE_FUTURE:
                    data = await vacationService.getFutureVacations();
                    break;

                case Filters.ALL:
                    data = await vacationService.getAllVacations();
                    break;
            }
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
                    onChange={() => {
                        filterOption
                    }
                    } required><option value="" disabled>  Filter by</option>
                    {
                        filterArray.map(({ value, label }) => (
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
