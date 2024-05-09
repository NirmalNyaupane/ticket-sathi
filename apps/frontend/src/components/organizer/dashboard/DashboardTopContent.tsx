'use client';
import React from 'react'

interface DashBoardTopContent {
    text: string | React.ReactNode;
    section1?: React.ReactNode;
    section2?: React.ReactNode;
    section3?: React.ReactNode;
    section4?: React.ReactNode;
}


const DashboardTopContent = ({ text, section1, section2, section3, section4 }: DashBoardTopContent) => {
    return (
        <div className='w-full flex justify-between mb-4 items-center gap-2'>
            <h2 className='text-2xl font-bold'>{text}</h2>
            <div>{section1}</div>
            <div>{section2}</div>
            <div>{section3}</div>
            {section4 && <div>{section4}</div>}
        </div>
    )
}

export default DashboardTopContent