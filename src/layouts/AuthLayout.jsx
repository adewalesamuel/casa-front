export function AuthLayout({children}) {
    return (
        <div className="w-100" style={{minHeight:'100vh'}}>
            <section className="d-flex align-items-center justify-content-center 
            position-relative h-100 px-2 py-5">
                <div className="w-100 h-50 position-absolute bg-primary" 
                style={{top:0, left:0}}></div>
                {children}
            </section>
        </div>
    )
}