import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

interface RecordModalProps {
  date: number;
  emoji: string;
  feelings: string;
  gratefulness: string;
  unease: string;
}

interface InitialState {
  open: boolean;
  type: "record" | "accountSuspended" | null;
  record: {
    content: RecordModalProps;
  } | null;
  suspended: {
    email: string;
  } | null;
}

const initialState: InitialState = {
  open: false,
  type: null,
  record: null,
  suspended: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleModal: (state, action: PayloadAction<{ open: boolean }>) => {
      return (state = {
        ...state,
        open: action.payload.open,
      });
    },
    initRecordModal: (
      state,
      action: PayloadAction<{ props: RecordModalProps }>
    ) => {
      return (state = {
        ...state,
        open: true,
        type: "record",
        record: {
          content: action.payload.props,
        },
      });
    },
    initAccountSuspendedModal: (
      state,
      action: PayloadAction<{ email: string }>
    ) => {
      return {
        ...state,
        open: true,
        type: "accountSuspended",
        suspended: { email: action.payload.email },
      };
    },
  },
});

export const { toggleModal, initRecordModal, initAccountSuspendedModal } =
  modalSlice.actions;
export default modalSlice.reducer;
