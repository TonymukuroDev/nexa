export interface IPermissionModalProps {
    permissionModal: {
        isOpen: boolean
    }

    modalContent: {
        process: string;
        content: string[]; 
        
        btnName: string;
        confirmAction: () => Promise<void>;
        cancelAction: () => void
    }
}