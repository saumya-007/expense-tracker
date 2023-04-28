const Icon = (props) => {
    const style = {
        fontSize: props.fontSize,
        color: props.fontColor,
        paddingRight: '10px',
    }
    return (
        <>
            <i className={props.iconClass} style={style}></i>
        </>
    )
}

export default Icon;