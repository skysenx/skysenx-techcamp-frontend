import { create } from "zustand";
import { IAssesssment, IStudent } from "../lib/types";

interface ModalStore {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  toggleModal: () => void;
  resetState: () => void;
}

const createModalStore = () =>
  create<ModalStore>((set) => ({
    isModalOpen: false,
    openModal: () => set({ isModalOpen: true }),
    closeModal: () => set({ isModalOpen: false }),
    toggleModal: () => set((state) => ({ isModalOpen: !state.isModalOpen })),
    resetState: () => set({ isModalOpen: false }),
  }));

export const useTakePicModal = createModalStore();

// stores/modals.ts

type AssessmentModalState = {
  isModalOpen: boolean;
  selectedStudent: IStudent | null;
  openModal: (student: IStudent) => void;
  closeModal: () => void;
};

export const useAssessmentModal = create<AssessmentModalState>((set) => ({
  isModalOpen: false,
  selectedStudent: null,
  openModal: (student) => set({ isModalOpen: true, selectedStudent: student }),
  closeModal: () => set({ isModalOpen: false, selectedStudent: null }),
}));

type PreviewAssessmentModalState = {
  isModalOpen: boolean;
  selectedAssessment: IAssesssment | null;
  openModal: (assessment: IAssesssment) => void;
  closeModal: () => void;
};

export const usePreviewAssessmentModal = create<PreviewAssessmentModalState>(
  (set) => ({
    isModalOpen: false,
    selectedAssessment: null,
    openModal: (assessment) =>
      set({ isModalOpen: true, selectedAssessment: assessment }),
    closeModal: () => set({ isModalOpen: false, selectedAssessment: null }),
  })
);
