import { ThemeProvider } from '@emotion/react';
import {
    Grid,
    CssBaseline,
    createTheme,
    Typography,
    Box,
    List,
    Fab,
    Divider,
} from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { memo, useEffect, useState } from 'react';
import { logout } from '../../store/reducers/tokenReducer';
import {
    deleteBoardRequest,
    getBoardsRequest,
    getBoardRequest,
    postBoardRequest,
    putBoardRequest,
} from '../../store/reducers/boardReducer';
import AddIcon from '@mui/icons-material/Add';
import { IBoardModel } from '../../Models/BoardModel';
import MyModal from '../MyModal/MyModal';
import Board from '../Board/Board';

function Home() {
    const [openCreate, setOpenCreate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [currentItem, setCurrentItem] = useState('');

    const username = useAppSelector((state) => state.user.username);
    const boards = useAppSelector((state) => state.board.boards);

    const dispatch = useAppDispatch();
    const defaultTheme = createTheme();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getBoardsRequest());
    }, []);

    if (!localStorage.getItem('token')) {
        navigate('/');
    }
    const handleClose = () => {
        setOpenCreate(false);
        setOpenEdit(false);
    };
    function handleClick() {
        dispatch(logout());
        return navigate('/');
    }
    const handleEdit = (board_id: string) => {
        setCurrentItem(board_id);
        setOpenEdit(true);
    };
    const handleUpdate = (newTitle: string) => {
        setOpenEdit(false);
        dispatch(putBoardRequest({ id: currentItem, title: newTitle }));
    };
    const handleRemove = (board_id: string) => {
        dispatch(deleteBoardRequest(board_id));
    };
    const handleAdd = () => {
        setOpenCreate(true);
    };
    const handleCreate = (title: string) => {
        setOpenCreate(false);
        dispatch(postBoardRequest({ title }));
    };
    const handleViewBoard = (board: IBoardModel) => {
        dispatch(getBoardRequest(board.id));
        return navigate(`/boards/${board.id}`);
    };

    return (
        <>
            <ThemeProvider theme={defaultTheme}>
                <CssBaseline />
                <Grid
                    container
                    sx={{
                        backgroundImage:
                            'url(https://source.unsplash.com/random?wallpapers)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light'
                                ? t.palette.grey[50]
                                : t.palette.grey[900],
                        backgroundSize: 'cover',
                        height: '100vh',
                        margin: 0,
                        padding: 0,
                    }}
                >
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'start',
                            alignItems: 'center',
                            backgroundColor: 'rgba(255,255,255,0.7)',
                            padding: '20px',
                        }}
                    >
                        <Grid container justifyContent="flex-end" spacing={4}>
                            <Grid item>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    onClick={handleClick}
                                >
                                    Log Out
                                </Button>
                            </Grid>
                        </Grid>
                        <Typography component="h1" variant="h3" gutterBottom>
                            Hello, {username} !
                        </Typography>
                        <Box
                            sx={{
                                width: '100%',
                                maxWidth: 360,
                                bgcolor: 'background.paper',
                            }}
                        >
                            <List
                                sx={{
                                    width: '100%',
                                    maxWidth: 360,
                                    bgcolor: 'background.paper',
                                }}
                            >
                                <Divider />
                                {boards?.map((board) => (
                                    <Board board={board} handleEdit={handleEdit} handleViewBoard={handleViewBoard} handleRemove={handleRemove}/>
                                ))}
                                <Divider />
                            </List>
                        </Box>
                        <Box>
                            <Fab
                                variant="extended"
                                color="primary"
                                aria-label="add"
                                onClick={handleAdd}
                            >
                                <AddIcon />
                                Create new board
                            </Fab>
                        </Box>
                    </Grid>
                </Grid>
            </ThemeProvider>
            <MyModal
                open={openCreate}
                onCloseHandler={handleClose}
                modalTitle="Add new board"
                modalDescription="Please type in a board title below:"
                onClickHandler={handleCreate}
                formPlaceholder="write a title for board here"
                formButton='Create'
            />
            <MyModal
                open={openEdit}
                onCloseHandler={handleClose}
                modalTitle="Edit board"
                modalDescription="Please type in a new board title below:"
                onClickHandler={handleUpdate}
                formPlaceholder="write a new title for board here"
                formButton='Edit'
            />
        </>
    );
}

export default memo(Home);
