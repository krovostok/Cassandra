(async () => {
    const inquirerModule = await import('inquirer');
    const inquirer = inquirerModule.default;
    const { addClient, listProducts, addOrder, getOrdersByClient, addProductReview, getClientOrders, getProductReviews } = require('./queries');

    const main = async () => {
        let exit = false;

        while (!exit) {
            const action = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'action',
                    message: 'What would you like to do?',
                    choices: ['Add Client', 'List Products', 'Add Order', 'Get Orders', 'Add Product Review', 'Get Client Orders', 'Get Product Reviews', 'Exit'],
                },
            ]);

            switch (action.action) {
                case 'Add Client':
                    const clientDetails = await inquirer.prompt([
                        { type: 'input', name: 'clientId', message: 'Client ID:' },
                        { type: 'input', name: 'firstName', message: 'First Name:' },
                        { type: 'input', name: 'lastName', message: 'Last Name:' },
                        { type: 'input', name: 'email', message: 'Email:' },
                    ]);
                    console.log(await addClient(parseInt(clientDetails.clientId), clientDetails.firstName, clientDetails.lastName, clientDetails.email));
                    break;

                case 'List Products':
                    console.log(await listProducts());
                    break;

                case 'Add Order':
                    const orderDetails = await inquirer.prompt([
                        { type: 'input', name: 'orderId', message: 'Order ID:' },
                        { type: 'input', name: 'clientId', message: 'Client ID:' },
                        { type: 'input', name: 'orderDate', message: 'Order Date (YYYY-MM-DD):' },
                        { type: 'input', name: 'totalAmount', message: 'Total Amount:' },
                        { type: 'input', name: 'orderDetails', message: 'Order Details:' },
                    ]);
                    console.log(await addOrder(parseInt(orderDetails.orderId), parseInt(orderDetails.clientId), orderDetails.orderDate, parseFloat(orderDetails.totalAmount), orderDetails.orderDetails));
                    break;

                case 'Get Orders':
                    const clientId = await inquirer.prompt([{ type: 'input', name: 'clientId', message: 'Client ID:' }]);
                    console.log(await getOrdersByClient(parseInt(clientId.clientId)));
                    break;

                case 'Add Product Review':
                    const reviewDetails = await inquirer.prompt([
                        { type: 'input', name: 'productId', message: 'Product ID:' },
                        { type: 'input', name: 'reviewId', message: 'Review ID:' },
                        { type: 'input', name: 'reviewDate', message: 'Review Date (YYYY-MM-DD):' },
                        { type: 'input', name: 'clientId', message: 'Client ID:' },
                        { type: 'input', name: 'reviewText', message: 'Review Text:' },
                        { type: 'input', name: 'rating', message: 'Rating (1-5):' },
                    ]);
                    console.log(await addProductReview(parseInt(reviewDetails.productId), parseInt(reviewDetails.reviewId), reviewDetails.reviewDate, parseInt(reviewDetails.clientId), reviewDetails.reviewText, parseInt(reviewDetails.rating)));
                    break;

                case 'Get Client Orders':
                    const clientOrdersDetails = await inquirer.prompt([
                        { type: 'input', name: 'clientId', message: 'Client ID:' },
                        { type: 'input', name: 'orderDate', message: 'Order Date (YYYY-MM-DD):' },
                    ]);
                    console.log(await getClientOrders(parseInt(clientOrdersDetails.clientId), clientOrdersDetails.orderDate));
                    break;

                case 'Get Product Reviews':
                    const productReviewsDetails = await inquirer.prompt([
                        { type: 'input', name: 'productId', message: 'Product ID:' },
                        { type: 'input', name: 'rating', message: 'Review Rating (1-5):' },
                    ]);
                    console.log(await getProductReviews(parseInt(productReviewsDetails.productId), parseInt(productReviewsDetails.rating)));
                    break;    

                case 'Exit':
                    console.log('Exiting...');
                    exit = true;
                    return;

                default:
                    console.log('Invalid command');
                    break;
            }
        }
    };

    await main();
})().catch(err => console.error(err));
