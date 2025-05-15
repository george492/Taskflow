import Alert from '@mui/material/Alert';
function DeletePage()
{
    function handleDelete()
    {
        console.log("Delete");
    }
    function handleCancel()
    {
        console.log("Cancel");
    }
    return(
        <div>
            <Alert severity="error">Are you sure you want to delete this task?</Alert>
           <div className='buttons'>
           <button onClick={handleDelete}>Delete</button>
           <button onClick={handleCancel}>Cancel</button>
           </div>
        </div>
    )
}
export default DeletePage;
