import React from 'react'





class Modal extends React.Component {
    onClose = (e) => {
        this.props.onClose && this.props.onClose(e)
    }
    render() {
        if (!this.props.show) {
            return null
        }
        return (<div className="backdropStyle">
            <div className='modalStyle border modal-content'>

                {this.props.children}
                <div className="footerStyle">
                    <button className='btn btn-info' onClick={(e) => { this.onClose(e) }}
                    > Close </button></div>
                    
            </div>
        </div>
        )
    }
}

export default Modal