export function Footer() {
	return (
	        <footer className="d-flex flex-wrap bg-light justify-content-center 
	        justify-lg-content-between align-items-center text-muted p-3">
                <h6>{import.meta.env.VITE_APP_NAME}</h6>
                <div>© Copyright {new Date().getFullYear()} | Tous droits réservés</div>
            </footer>  
		)
}