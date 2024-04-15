import { memo, useEffect } from 'react';
import { IBoardModel } from '../../Models/BoardModel';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

function BoardPage() {
    const { boardId } = useParams();
    const board = useAppSelector((state) => state.board.board);
    const dispatch = useAppDispatch();

    useEffect(() => {
        // dispatch(GET_)
    }, [])

    return <>
        <h1>this is board '{ board?.title }' page</h1>
    </>
}

export default memo(BoardPage);
