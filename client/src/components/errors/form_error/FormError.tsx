import {FC} from 'react'

interface IFormError {
    message: string
}

const FormError:FC<IFormError> = ({message}) => {
    return (
        <div className="form-error">{message}</div>
    )
}


export default FormError;