const CRUD_CATALOG = [
    { path: 'data/crud_auth.js', varName: 'crudAuth' },
    { path: 'data/crud_employee.js', varName: 'crudEmployee' },
    { path: 'data/crud_products.js', varName: 'crudProducts' },
    { path: 'data/crud_test.js', varName: 'crudTest' }
];

// Expose to global scope for loader
if (typeof window !== 'undefined') {
    window.CRUD_CATALOG = CRUD_CATALOG;
}
