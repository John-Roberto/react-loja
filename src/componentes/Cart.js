import Button from "./Button";

/**
 * Componente para listagem de produto no carrinho
 * @param {Object} product produto para listagem
 */
function CartProduct({ product, onChange, isLoading }) {
    return (
        <li className="list-group-item d-flex justify-content-between align-items-center bg-light border-0 mb-2 rounded-3 p-3 shadow-sm">
            <div className="me-3">
                <p className="mb-0 text-muted small">{product.name}</p>
                <span className="fw-bold text-dark">R${product.price}</span>
            </div>
            
            <div className="btn-group btn-group-sm" role="group">
                <button 
                    type="button" 
                    className="btn btn-outline-secondary" 
                    disabled={isLoading} 
                    onClick={() => onChange(product, -1)}
                >
                    -
                </button>
                <button type="button" className="btn btn-outline-secondary" disabled>
                    {product.units}
                </button>
                <button 
                    type="button" 
                    className="btn btn-outline-secondary" 
                    disabled={isLoading} 
                    onClick={() => onChange(product, +1)}
                >
                    +
                </button>
            </div>
        </li>
    );
}

/**
 * Componente para listagem de produtos no carrinho
 * @param {Object[]} products Produtos para listagem
 * @param {Function} onClick Funcao de finalizacao
 * @param {Boolean} isLoading Status de loading
 */
function Cart({ products, onChange, onClick, isLoading = false }) {
    return (
        <section className="d-flex flex-column h-100 p-3">
            <h4 className="mb-4">Carrinho</h4>
            <ul className="list-group list-group-flush mb-auto overflow-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
                {products.length === 0 && <li className="list-group-item text-center text-muted">Carrinho vazio</li>}
                
                {products.map((product) => (
                    <CartProduct
                        key={product.id}
                        product={product}
                        onChange={onChange}
                        isLoading={isLoading}
                    />
                ))}
            </ul>
            <div className="mt-3">
                <Button onClick={onClick} isLoading={isLoading}>
                    Finalizar Compra
                </Button>
            </div>
        </section>
    );
}

export default Cart;