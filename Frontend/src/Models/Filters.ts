
export enum Filters {
  ALL, LIKED, ACTIVE_DATE, IN_THE_FUTURE
}

type FilterWrapper = {
  value: Filters;
  label: string;
};

export const filterArray: FilterWrapper[] = [
  {
    value: Filters.ALL,
    label: "All vacations",
  },
  {
    value: Filters.LIKED,
    label: "Liked vacations",
  },
  {
    value: Filters.ACTIVE_DATE,
    label: "Active vacations",
 
  },
  {
    value: Filters.IN_THE_FUTURE,
    label: "Future Vacations",

  }
]