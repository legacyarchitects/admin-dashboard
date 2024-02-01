import { NavLink } from 'react-router-dom';
import { Disclosure } from '@headlessui/react';

// Sub-navigation configuration
const subNavigation = [
  { name: 'General', to: '/contacts/general' },
  { name: 'Family', to: '/contacts/family' },
  { name: 'Estate', to: '/contacts/estate' },
  { name: 'Plan', to: '/contacts/plan' },
  { name: 'Incapacity', to: '/contacts/incapacity' },
  { name: 'Guardianship', to: '/contacts/guardianship' },
  { name: 'Names', to: '/contacts/names' },
  { name: 'Files', to: '/contacts/files' },
  { name: 'Supplemental', to: '/contacts/supplemental' },
  { name: 'Invite', to: '/contacts/invite' },
];

export default function TabNav() {
  return (
    <div>
      {/* Sub-tab Navigation */}
      <Disclosure as="div" className="bg-sky-800">
        {/* Other disclosure content... */}

        <div className="hidden sm:block">
          <div className="flex space-x-4">
            {subNavigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.to}
                className={({ isActive }) =>
                  isActive
                    ? 'bg-sky-950 text-white rounded-md px-3 py-2 text-sm font-medium'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>
      </Disclosure>

      {/* Outlet for child route components */}
    </div>
  );
}