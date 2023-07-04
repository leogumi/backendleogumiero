
function checkProductPermissions(req, res, next) {

}


router.delete('/products/:productId', checkProductPermissions, ProductController.deleteProduct);
