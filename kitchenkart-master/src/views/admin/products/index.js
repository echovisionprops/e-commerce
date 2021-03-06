import React from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { ADD_PRODUCT } from 'constants/routes';
import ProductAppliedFilters from 'components/product/ProductAppliedFilters';
import { selectFilter } from 'selectors/selector';
import ProductList from 'components/product/ProductList';
import Boundary from 'components/ui/Boundary';
import SearchBar from 'components/ui/SearchBar';
import FiltersToggle from 'components/ui/FiltersToggle';
import ProductItem from '../components/ProductItem';

const Products = ({ history }) => {
  const { store } = useSelector((state) => ({
    store: {
      productsLength: state.products.items.length,
      filter: state.filter,
      products: state.products.items,
      isLoading: state.app.loading,
      lastRefKey: state.products.lastRefKey,
      totalItems: state.products.total,
      filteredProducts: selectFilter(state.products.items, state.filter),
      requestStatus: state.app.requestStatus,
    },
  }));

  const onClickAddProduct = () => {
    history.push(ADD_PRODUCT);
  };

  // TODO insufficient permission
  // TODO fix filters modal
  return (
    <Boundary>
      <div className="product-admin-header">
        <h3 className="product-admin-header-title">
          Products &nbsp; ({`${store.productsLength} / ${store.totalItems}`})
        </h3>
        <SearchBar
          filter={store.filter}
          history={history}
          isLoading={store.isLoading}
          productsLength={store.productsLength}
        />
        &nbsp;
        <FiltersToggle
          filter={store.filter}
          history={history}
          isLoading={store.isLoading}
          products={store.products}
          productsLength={store.productsLength}
        >
          <button className="button-muted button-small">
            More Filters &nbsp;
            <i className="fa fa-chevron-right" />
          </button>
        </FiltersToggle>
        <button className="button button-small" onClick={onClickAddProduct}>
          Add New Product
        </button>
      </div>
      <div className="product-admin-items">
        <ProductList>
          {({ filteredProducts }) => (
            <>
              <ProductAppliedFilters filter={store.filter} />
              {filteredProducts.length > 0 && (
                <div className="grid grid-product grid-count-6">
                  <div className="grid-col" />
                  <div className="grid-col">
                    <h5>Name</h5>
                  </div>
                  <div className="grid-col">
                    <h5>Brand</h5>
                  </div>
                  <div className="grid-col">
                    <h5>Price</h5>
                  </div>
                  <div className="grid-col">
                    <h5>Date Added</h5>
                  </div>
                  <div className="grid-col">
                    <h5>Qty</h5>
                  </div>
                </div>
              )}
              {filteredProducts.length === 0
                ? new Array(10)
                    .fill({})
                    .map((product, index) => (
                      <ProductItem
                        key={`product-skeleton ${index}`}
                        product={product}
                      />
                    ))
                : filteredProducts.map((product) => (
                    <ProductItem key={product.id} product={product} />
                  ))}
            </>
          )}
        </ProductList>
      </div>
    </Boundary>
  );
};

export default withRouter(Products);
