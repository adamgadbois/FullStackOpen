const Notification = ({notification}) => {
    const error = notification.error
    const message = notification.message
    if (message === ''){
        return null
    }
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