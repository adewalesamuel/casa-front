import { Components } from '../components';

export function MainLayout({children}) {
	return (
		<div className='w-100'>
                  <Components.Header />  
                  <main className="p-3 p-md-5 container">{children}</main>
                  <Components.Footer />
            </div>
	)
}