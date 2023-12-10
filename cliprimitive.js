const queries = require ("./queries");

const { addClient, listProducts, addOrder, getOrdersByClient, addProductReview } = require('./queries');

const process = require('process');

const main = async () => {
    const args = process.argv.slice(2);

    switch(args[0]) {
        case 'addclient':
            console.log(await addClient(parseInt(args[1]), args[2], args[3], args[4]));
            break;
        case 'listproducts':
            console.log(await listProducts());
            break;
        case 'addorder':
            console.log(await addOrder(parseInt(args[1]), parseInt(args[2]), args[3], parseFloat(args[4]), args[5]));
            break;
        case 'getorders':
            console.log(await getOrdersByClient(parseInt(args[1])));
            break;
        case 'addreview':
            console.log(await addProductReview(parseInt(args[1]), parseInt(args[2]), args[3], parseInt(args[4]), args[5], parseInt(args[6])));
            break;
        default:
            console.log('Invalid command');
    }
};

main().catch(err => console.error(err));
