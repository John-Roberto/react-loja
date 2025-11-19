/**
 * Componente para listagem de produto
 * @param {Object} product Produto para listagem
 * @param {Function} onClick Funcao de selecao
 */
function Product({ product, onClick }) {
    return (
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <div 
                className="card h-100 shadow-sm border-0 bg-light" 
                style={{ cursor: 'pointer' }} 
                onClick={() => onClick(product)}
            >
                <img 
                    src={product.image} 
                    className="card-img-top p-2" 
                    alt={product.name} 
                    style={{ height: '160px', objectFit: 'cover', borderRadius: '15px' }} 
                />
                <div className="card-body d-flex flex-column justify-content-between">
                    <p className="card-text mb-2 text-secondary">{product.name}</p>
                    <h5 className="card-title fw-bold">R${product.price}</h5>
                </div>
            </div>
        </div>
    );
}

/**
 * Componente para listagem de produtos
 * @param {Object[]} products Produtos para listagem
 * @param {Function} onClick Funcao de selecao
 */
function Products({ products, onClick, isLoading = false }) {
    return (
        <section className="container-fluid p-4">
            <div className="row">
                {isLoading ? (
                    <div className="col-12 text-center mt-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Carregando...</span>
                        </div>
                    </div>
                ) : products.length > 0 ? (
                    products.map((product) => (
                        <Product key={product.id} product={product} onClick={onClick} />
                    ))
                ) : (
                    <div className="col-12 text-center">
                        <p className="alert alert-warning">Nenhum produto encontrado!</p>
                    </div>
                )}
            </div>
        </section>
    );
}

export default Products;