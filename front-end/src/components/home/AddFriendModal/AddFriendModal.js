import './AddFriendModal.scss'

const AddFriendModal = ({ setModal }) => {

    const removeModal = () => {
        setModal(false)
    }

    const submitHandler = (e) => {
        e.preventDefault();
        alert(e.target.name.value)
    }

    return (
        <div className="modal" >
            <div className="modal__content" onClick={e => { e.stopPropagation() }}>
                <span className="modal__close" onClick={removeModal}>&times;</span>
                <h1 className='modal__title'>Add a friend!</h1>
                <form onSubmit={submitHandler}>
                    <label className='modal__form-label'>
                        Friend's name
                        <input className='modal__form-name' type='text' name='name' placeholder='Chris Lee'></input>
                    </label>
                    <button className='modal__form-button'>Add</button>
                </form>
            </div>
        </div>
    )
}

export default AddFriendModal;