import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import useBreadcrumbs from 'use-react-router-breadcrumbs'

const Breadcrumd = () => {
    const breadcrumbs = useBreadcrumbs()
    const location = useLocation()
    return (
        <div className="ml-4 px-4 sm:px-6 lg:px-8 mt-5 p-2 rounded-xl">
            <div className="flex items-center space-x-2 text-gray-500 text-md">
                {breadcrumbs.map(({ match, breadcrumb }, index) => {
                    if (match.pathname === location.pathname)
                        return (<span key={index} className=''>{breadcrumb}</span>)
                    else
                        return (<React.Fragment key={`breadcrumb-${index}`}>
                            <Link to={match.pathname} className="hover:underline text-black hover:text-gray-600">
                                {breadcrumb}
                            </Link>
                            <span key={`separator-${index}`}>
                                <svg className="h-5 w-5 leading-none text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </span>
                        </React.Fragment>
                        )
                })}
            </div>
        </div>
    )
}

export default Breadcrumd