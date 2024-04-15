import { Box, Modal } from '@mui/material';
import BasicFormControl from '../BasicForm/BasicForm';
import { memo } from 'react';

export const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

interface ModalProps {
    open: boolean;
    onCloseHandler: () => void;
    modalTitle: string;
    modalDescription: string;
    onClickHandler: (title: string) => void;
    formPlaceholder: string;
    formButton: string

}

function MyModal(props: ModalProps) {
    return (
        <Modal
                open={props.open}
                onClose={props.onCloseHandler}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 400 }}>
                <h2 id="parent-modal-title">{props.modalTitle}</h2>
                    <p id="parent-modal-description">
                        {props.modalDescription}
                    </p>
                    <BasicFormControl
                        handleClick={props.onClickHandler}
                        label="Title"
                        placeholder={props.formPlaceholder}
                        btnText={props.formButton}
                    />
                </Box>
            </Modal>
    )
}

export default memo(MyModal);