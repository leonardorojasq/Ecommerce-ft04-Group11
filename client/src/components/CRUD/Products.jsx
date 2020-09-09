import React, { useEffect, useState } from 'react';
import {connect} from 'react-redux';
import { getProducts, deleteProduct, updateProduct, addCategoryToProduct, deleteCategoryToProduct } from '../../actions/products';
import { getCategories } from '../../actions/categories';

var idCat;
//********************* CONECTADO AL STORE DE REDUX ***************************/
const  Products = ({allProduct, allcategories, getCategories, getProducts, deleteProduct, addCategoryToProduct, deleteCategoryToProduct, updateProduct, editRow}) => {


    function selectIdCat (e) {
        idCat = e.target.value;
    }

    useEffect(() => {
        getProducts();
        getCategories();
    },[]);
    


    const categorieslistexistin = allcategories.map(cat => {
        return  (
            <option key={cat.id} value={cat.id}> {cat.name} </option> 
            )
    })

       const productList = allProduct.map((product, index) =>{
           
        return  (
            <tr  key={index}>
                    <td>{product.name}</td>
                    <td><small>{product.description}</small></td>
                    <td>{product.stock}</td>
                    <td>{product.price}</td>
                    
                    {product.images && ( 
                    <td> <img  src={JSON.parse(product.images)[0]} alt="" title=""  width="60" height="80"/> </td>
                    )}
                    <td>
                        <div className="btn-group">
                            <button className="btn btn-warning btn-sm"   onClick={() => {editRow(product)}}>Edit</button>
                                                                
                            <button className="btn btn-danger btn-sm" onClick={()=> deleteProduct(product.id)}>Delete</button>
                                                                     
                        </div>                              
                    </td>
                    <td className="text-center">

                            <select className="form-control form-control-sm mb-1" onChange={selectIdCat}> <option>Seleccionar</option> {categorieslistexistin} </select> 
                            <button className="btn btn-outline-light btn-block btn-sm mb-1" onClick={() => { addCategoryToProduct(idCat, product.id); window.location.reload(true);} }>Añadir</button>    
                            {(product.categories.length && product.categories.map((cat, index) => (
                            <span key = {index} className="pl-3 badge m-1 badge-dark2 badge-sm badge-pill">    {cat.name}                    
                                <button  className="btn btn-outline-light btn-sm border-0" onClick={()=>{ deleteCategoryToProduct(cat.id, product.id); window.location.reload(true);}}  >&times;</button>
                            </span>
                        ))) || (<small><em>Sin categorías</em></small>)}
                    </td> 
                   
            </tr>
            )
    }
    );
   
return  (
        <div className="table-responsive" >
            <table className="table table-hover table-striped table-sm table-dark">
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Descripcion</th>
                        <th>Stock</th>
                        <th>Precio</th>
                        <th>Image</th>
                        <th>Acción</th>
                        <th>Categorías</th>
           
                    </tr>
                </thead>
                <tbody>
                    {productList}
                </tbody>
            </table>
        </div>
        )


}


function mapStateToProps(state){
    return {
        allProduct: state.productsReducer.products,
        allcategories: state.categoriesReducer.categories,
    }
}

function mapDispatchToProps(dispatch){
    return {
        getProducts: (value) => dispatch(getProducts(value)),
        getCategories: () => dispatch(getCategories()),
        deleteProduct: (value) => dispatch(deleteProduct(value)),
        addCategoryToProduct: (idCat, idProduct) => dispatch(addCategoryToProduct(idCat, idProduct)),
        deleteCategoryToProduct: (idCat, idProduct) => dispatch(deleteCategoryToProduct(idCat, idProduct)),
        updateProduct: (idProduct, attributes) => dispatch(updateProduct(idProduct, attributes))
        
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Products);

