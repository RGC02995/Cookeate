import { Link } from "react-router-dom"

function NotFoundPage (){
    return(
        <div>
        <h1>404 not found</h1>
        <Link to='/'>Volver a la pagina principal</Link>
        </div>
    )
}
export default NotFoundPage