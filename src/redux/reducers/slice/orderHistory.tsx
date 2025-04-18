import { CompositeFilterDescriptor, SortDescriptor } from "@progress/kendo-data-query";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";

interface Page {
  skip: number;
  take: number;
}
interface initialState {
  showFilter: boolean;
  showFilterDialog: boolean;
  filterTags: FilterTag[];
  sort?: SortDescriptor[];
  filter?: CompositeFilterDescriptor;
  page: Page;
  total: number;
}

export interface FilterTag {
  name: string;
  tagValue: string;
  value: string | Date | number | boolean | { id: string; text: string } | null;
}

const initialState: initialState = {
  showFilter: false,
  showFilterDialog: false,
  sort: [],
  page: {
    take: 100,
    skip: 0,
  },
  total: 0,
  filter: {
    logic: "or",
    filters: [],
  },
  filterTags: [],
};

const orderHistoryAction = createSlice({
  name: "orderHistory",
  initialState,
  reducers: {
    handleFilter(state, action: PayloadAction<{ showFilter: boolean }>) {
      state.showFilter = action.payload.showFilter;
    },
    handleShowFilterDialog(state) {
      state.showFilterDialog = !state.showFilterDialog;
    },
    handleOrderHistoryFilter(state, action: PayloadAction<CompositeFilterDescriptor>) {
      state.filter = action.payload;
    },
    handleOrderHistorySort(state, action: PayloadAction<SortDescriptor[]>) {
      state.sort = action.payload;
    },
    handleOrderHistoryPageChange(state, action: PayloadAction<Page>) {
      state.page = action.payload;
    },
    handleFilterTags(state, action: PayloadAction<FilterTag[]>) {
      state.filterTags = action.payload;
    },
    handleRemoveFilter(state, action: PayloadAction<string>) {
      // state.dataState = {
      //   ...state?.dataState,
      //   filter: {
      //     ...state?.dataState?.filter,
      //     filters: state.dataState?.filter?.filters?.filter(
      //       (_f: FilterDescriptor) => _f.field.toString().toLowerCase() !== action.payload.toLowerCase(),
      //     ),
      //   },
      // };
      state.filterTags = state.filterTags.filter((_f) => _f.name.toLowerCase() !== action.payload.toLowerCase());
    },
  },
});

export const {
  handleFilter,
  handleShowFilterDialog,
  handleOrderHistoryFilter,
  handleFilterTags,
  handleRemoveFilter,
  handleOrderHistorySort,
  handleOrderHistoryPageChange,
} = orderHistoryAction.actions;
export default orderHistoryAction;
