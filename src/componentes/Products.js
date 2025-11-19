import styled from "styled-components";

/* Elemento de bloco personalizado com CSS */
const SDiv = styled.div`
    height: 260px;
    padding: 10px;
    border-radius: 10px;
    background: #f2f2f2;
    cursor: pointer;

    img {
        width: 100%;
        height: 140px;
        border-radius: 5px;
    }
`;

/* Elemento do bloco de informacao personalizado com CSS */
const SDivInfo = styled.div`
    padding: 15px;

    p {
        font-size: 15px;
    }

    span {
        font-size: 20px;
        font-weight: bold;
    }
`;

/**
 * Componente para listagem de produto
 * @param {Object} product Produto para listagem
 * @param {Function} onClick Funcao de selecao
 */
function Product({ product, onClick }) {
    return (
        <SDiv onClick={() => onClick(product)}>
            <img src={product.image} alt={product.name} />
            <SDivInfo>
                <p>{product.name}</p>
                <span>R${product.price}</span>
            </SDivInfo>
        </SDiv>
    );
}

/* Elemento de secao personalizado com CSS */
const SSection = styled.section`
    overflow: auto;
    padding: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-auto-rows: 230px;
    gap: 2opx;
`;

/**
 * Componente para listagem de produtos
 * @param {Object[]} products Produtos para listagem
 * @param {Function} onClick Funcao de selecao
 */
function Products({ products, onClick, isLoading = false}) {
    return (
        <SSection>
            {isLoading // Verifica se esta em loading
                ? "Carregando..."
                : products.lenght > 0 // Verifica se existem produtos
                ? products.map((product) => (
                    <Product key={product.id} product={product} onClick={onClick} />
                ))
                : "Nenhum produto encontrado!"
            }
        </SSection>
    );
}

export default Products;