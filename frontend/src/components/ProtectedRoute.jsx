import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext.js";

function ProtectedRoute({ children, roleNecessario }) {
    const { usuario } = useContext(AuthContext);

    if (!usuario) {
        return <Navigate to="/login" replace />;
    }

    if (roleNecessario && usuario.role !== roleNecessario) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default ProtectedRoute;
