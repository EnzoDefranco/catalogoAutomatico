import axios from "axios";
import ArticuloCard from "../components/ProductCard";

async function loadProducts() {
    const {data} = await axios.get("http://localhost:3000/api/products");
    return data;
}

async function CatologoPage() {
    const products = await loadProducts();
    return (
        <div className="container mx-auto mt-5">
            <h1 className="text-2xl font-bold mb-4">Catálogo de Productos</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product) => (
                    <ArticuloCard key={product.idArticulo} product={product} />
                ))}
            </div>
        </div>
    );
}


export default CatologoPage;