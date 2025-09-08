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
            const label = filterArray.find(f => f.value === filter)?.label;
  localStorage.setItem("filterName",  label);
      localStorage.setItem("filterValue", String(filter));

            switch (filter) {
                case Filters.LIKED:
                    await vacationService.getLikedVacations();
                    break;

                case Filters.ACTIVE_DATE:
                   await vacationService.getActiveVacations();


                    break;

                case Filters.IN_THE_FUTURE:
                 await vacationService.getFutureVacations();

            
                    break;

                case Filters.ALL:
                default: {
                
                    localStorage.setItem("filterName", "All vacations");
                    localStorage.setItem("filterValue", String(Filters.ALL));
                     await vacationService.getAllVacations();
                    break;

                }

            }

        } catch (err: any) {
            notify.error(err);
        }
    }

    return (
        <div className="Menu">
            <span className="filter-section">
                <TuneIcon />
                <select defaultValue={localStorage.getItem("filterValue") ?? 
                    String(Filters.ALL)} onChange={filterOption}>
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
