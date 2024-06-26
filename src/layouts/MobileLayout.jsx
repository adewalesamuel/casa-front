import { Components } from '../components';

export function MobileLayout({children}) {
	return (
		<div className='w-100' id="mobile">  
            <Components.MobileHeader />
            <main className="p-3">{children}</main>
            <Components.MobileMenu />
            <footer className="w-100" style={{height: '4em'}}></footer>
        </div>
	)
}