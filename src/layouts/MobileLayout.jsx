import { Components } from '../components';

export function MobileLayout({children}) {
	return (
		<div className='w-100'>  
            <Components.MobileHeader />
            <main className="p-3">{children}</main>
        </div>
	)
}