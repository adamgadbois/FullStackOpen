const Notification = ({notification}) => {
    if (!notification){
        return null
    }
    const error = notification.error
    const message = notification.message
    const errorStyle = {
        color: 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    const successStyle = {
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    return (
        <div style={error ? errorStyle : successStyle}>
            {message}
        </div>
    )
}

export default Notification