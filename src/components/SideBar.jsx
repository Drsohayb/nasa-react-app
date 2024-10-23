import React from 'react'

export default function SideBar(props) {
    const {handelShowModel,data}=props;
  return (
    <div className='sidebar'>
        <div className="bgOverlay" onClick={handelShowModel}></div>
        <div className="sidebarContents">
            <h2>{data?.title}</h2>
            <div className='descriptionContainer'>
                <p className='descriptionTitle'>{data.date}</p>
                <p>
                    {data.explanation}
                </p>
            </div>
            <button onClick={handelShowModel}>
                <i className="fa-solid fa-arrow-right"></i>
            </button>
        </div>
    </div>
  )
}
