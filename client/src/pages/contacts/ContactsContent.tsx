
import { useAppDispatch } from '../../app/hooks';
import { contactBtnContainerOpen } from '../../components/modals/contactBtnContainer/store/contactBtnContainer.slice';
import './ContactsContent.css';

const ContactsContent = () => {
  const dispatch = useAppDispatch()

  const onOpenContactBtnContainer = () => {
    dispatch(contactBtnContainerOpen())
  }

  
  return (
    <div className="contacts content">
      <button onClick={onOpenContactBtnContainer} className="btn">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="icon">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>

      </button>  
      <div className="head">
        <div id="page">Contacts</div>
      </div>
    </div>
  )
}

export default ContactsContent