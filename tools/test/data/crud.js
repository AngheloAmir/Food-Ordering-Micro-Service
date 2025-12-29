const CRUD_CATALOG = [
    { path: 'data/crud/crud_auth.js',     varName: 'crudAuth' },
    { path: 'data/crud/crud_user.js',     varName: 'crudUser' },
    { path: 'data/crud/crud_products.js', varName: 'crudProducts' },
    { path: 'data/crud/crud_employee.js', varName: 'crudEmployee' },
    { path: 'data/crud/crud_tools.js',    varName: 'crudTools' }
];

// Expose to global scope for loader
if (typeof window !== 'undefined') {
    window.CRUD_CATALOG = CRUD_CATALOG;
}
