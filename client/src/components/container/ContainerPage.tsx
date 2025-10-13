import React from "react";
import './ContainerPage.css'

interface IContainerPageProps {
    children: React.ReactNode
}
const ContainerPage: React.FC<IContainerPageProps> = ({children}) => {
    return (
        <div className="containerPage">
            {children}
        </div>
    )
}


export default ContainerPage;