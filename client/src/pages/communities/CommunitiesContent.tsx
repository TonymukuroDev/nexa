import './CommunitiesContent.css'

const CommunitiesContent = () => {
  return (
    <div className="communities content">
      <div className="head">
        <div id="page">Communities</div>
        <div className="btn__container">
          <button className="btn">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default CommunitiesContent