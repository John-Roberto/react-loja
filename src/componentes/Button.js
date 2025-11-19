/**
 * Componente de botao
 * @param {HTMLCollection} children Elementos internos
 * @param {Function} onClick Funcao ao clicar
 * @param {Boolean} isLoading Status de loading
 */
function Button({ children, onClick, isLoading = false }) {
    return (
        <button 
            className="btn btn-dark w-100 py-3 rounded-3 fw-bold" 
            onClick={onClick} 
            disabled={isLoading}
        >
            {isLoading ? (
                <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Carregando...
                </>
            ) : children}
        </button>
    );
}

export default Button;