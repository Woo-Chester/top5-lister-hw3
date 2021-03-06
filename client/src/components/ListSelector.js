import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import ListCard from './ListCard.js'
import { GlobalStoreContext } from '../store'
import DeleteModal from './DeleteModal'
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const ListSelector = () => {
    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();

    function handleAddList(event){
        if (!event.target.disabled) {
            store.createNewList();
        }
    }

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    let listCard = "";
    if (store) {
        listCard = store.idNamePairs.map((pair) => (
            <ListCard
                key={pair._id}
                idNamePair={pair}
                selected={false}
            />
        ))
    }

    let disable_add = store.isListNameEditActive || store.listMarkedForDeletion;

    return (
        <div id="top5-list-selector">
            <div id="list-selector-heading">
                <input
                    disabled={disable_add}
                    type="button"
                    id="add-list-button"
                    className="top5-button"
                    value="+"
                    onClick={handleAddList} />
                Your Lists
            </div>
            <div id="list-selector-list">
                {
                    listCard
                }
                <DeleteModal />
            </div>
        </div>)
}

export default ListSelector;