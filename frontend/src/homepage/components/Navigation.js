import React from 'react';
import {NavLink} from 'react-router-dom';
import {CONSTANTS} from '../../common/constants';
import Logo from '../../assets/images/icons/logo.svg';

const Navigation = () => (
    <nav className="px-8 py-4 text-xl font-garet-heavy">
        <div className="uppercase">
            <img src={Logo} className="mr-3 h-6 sm:h-9" alt="Tummy Companion Logo"/>
            <div className="flex justify-between items-center mt-1">
                <NavLink to={'/'} className="hover:text-secondary cursor-pointer">
                    {CONSTANTS.APP_NAME}
                </NavLink>
                <div className="flex space-x-12">
                    {CONSTANTS.WELCOME_NAV.map((item) => (
                        <NavLink key={item}
                                 to={`/${item}`}
                                 className={({isActive}) =>
                                     `hover:text-secondary cursor-pointer ${isActive ? 'text-secondary' : ''}`
                                 }
                        >
                            {item}
                        </NavLink>
                    ))}
                </div>
            </div>
        </div>
    </nav>
);

export default Navigation;