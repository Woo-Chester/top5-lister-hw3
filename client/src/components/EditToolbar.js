import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { useHistory } from 'react-router-dom'
/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);
    const history = useHistory();

    let enabledButtonClass = "top5-button";
    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }
    function handleClose() {
        history.push("/");
        store.closeCurrentList();
    }
    let editStatus = false;
    if (store.isListNameEditActive || store.isItemNameEditActive) {
        editStatus = true;
    }
    let undo_class = enabledButtonClass + (editStatus || !store.hasUndoTransaction() ? "-disabled" : "");
    let redo_class = enabledButtonClass + (editStatus || !store.hasRedoTransaction() ? "-disabled" : "");
    let close_class = enabledButtonClass + ((!editStatus && store.currentList!=null && store.listMarkedForDeletion==null) ? "" : "-disabled");

    return (
        <div id="edit-toolbar">
            <div
                disabled={editStatus || !store.hasUndoTransaction()}
                id='undo-button'
                onClick={handleUndo}
                className={undo_class}>
                &#x21B6;
            </div>
            <div
                disabled={editStatus || !store.hasRedoTransaction()}
                id='redo-button'
                onClick={handleRedo}
                className={redo_class}>
                &#x21B7;
            </div>
            <div
                disabled={editStatus}
                id='close-button'
                onClick={handleClose}
                className={close_class}>
                &#x24E7;
            </div>
        </div>
    )
}

export default EditToolbar;