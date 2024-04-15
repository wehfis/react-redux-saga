import {
    ListItem,
    ListItemText,
    ListItemButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IBoardModel } from '../../Models/BoardModel';
import { memo } from 'react';

interface BoardProps {
    board: IBoardModel,
    handleViewBoard: (board: IBoardModel) => void,
    handleEdit: (boardId: string) => void,
    handleRemove: (boardId: string) => void,
}

function Board(props: BoardProps) {

    const handleViewBoard = () => {
        props.handleViewBoard(props.board);
    }
    const handleEdit = () => {
        props.handleEdit(props.board.id);
    }
    const handleRemove = () => {
        props.handleRemove(props.board.id);
    }

    return (
        <ListItem disablePadding key={props.board.id}>
            <ListItemButton onClick={handleViewBoard}>
                <ListItemText primary={props.board.title} />
            </ListItemButton>
            <EditIcon onClick={handleEdit} />
            <DeleteIcon onClick={handleRemove} />
        </ListItem>
    );
}

export default memo(Board);
