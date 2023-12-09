const { execute } = require ("./execute");

async function addClient(clientId, firstName, lastName, email) {
    const query = 'INSERT INTO eshop.clients (client_id, first_name, last_name, email) VALUES (?, ?, ?, ?) IF NOT EXISTS';
    try {
        const result = await execute(query, [clientId, firstName, lastName, email]);

        // Check the result to determine if the insert was successful
        if (result.wasApplied()) {
            return 'Client added successfully';
        } else {
            return 'Client with the same email already exists';
        }
    } catch (error) {
        console.error('Error adding client:', error);
        return 'Failed to add client';
    }
}

async function listProducts() {
    const query = 'SELECT * FROM eshop.products';
    try {
        const products = await execute(query, []);
        return products; // Assuming this returns an array of product objects
    } catch (error) {
        console.error('Error retrieving products:', error);
        return 'Failed to retrieve products';
    }
}

async function addOrder(orderId, clientId, orderDate, totalAmount, orderDetails) {
    const insertOrdersQuery = 'INSERT INTO eshop.orders (order_id, client_id, order_date, total_amount, order_details) VALUES (?, ?, ?, ?, ?)';
    const insertOrdersByClientDateQuery = 'INSERT INTO eshop.orders_by_client_date (client_id, order_id, order_date, total_amount, order_details) VALUES (?, ?, ?, ?, ?)';
    
    try {
        // Insert data into the orders table
        await execute(insertOrdersQuery, [orderId, clientId, orderDate, totalAmount, orderDetails]);

        // Insert the same data into the orders_by_client_date table
        await execute(insertOrdersByClientDateQuery, [clientId, orderId, orderDate, totalAmount, orderDetails]);

        return 'Order added successfully';
    } catch (error) {
        console.error('Error adding order:', error);
        return 'Failed to add order';
    }
}


async function getOrdersByClient(clientId) {
    const query = 'SELECT * FROM eshop.orders WHERE client_id = ?';
    try {
        const orders = await execute(query, [clientId]);
        return orders; // Assuming this returns an array of order objects
    } catch (error) {
        console.error('Error retrieving orders:', error);
        return 'Failed to retrieve orders';
    }
}

async function addProductReview(productId, reviewId, reviewDate, clientId, reviewText, rating) {
    const insertReviewsQuery = 'INSERT INTO eshop.reviews (review_id, client_id, product_id, review_text, rating) VALUES (?, ?, ?, ?, ?)';
    const insertProductReviewsQuery = 'INSERT INTO eshop.product_reviews_by_product_rating (product_id, review_id, review_date, client_id, review_text, rating) VALUES (?, ?, ?, ?, ?, ?)';

    try {
        // Insert data into the reviews table
        await execute(insertReviewsQuery, [reviewId, clientId, productId, reviewText, rating]);

        // Insert the same data into the product_reviews table
        await execute(insertProductReviewsQuery, [productId, reviewId, reviewDate, clientId, reviewText, rating]);

        return 'Review added successfully';
    } catch (error) {
        console.error('Error adding review:', error);
        return 'Failed to add review';
    }
}

async function getProductReviews(productId, rating) {
    const query = 'SELECT * FROM eshop.product_reviews_by_product_rating WHERE product_id = ? AND rating = ?';
    try {
        const reviews = await execute(query, [productId, rating]);
        return reviews; // Assuming this returns an array of review objects
    } catch (error) {
        console.error('Error retrieving product reviews:', error);
        return 'Failed to retrieve product reviews';
    }
}

async function getClientOrders(clientId, orderDate) {
    const query = 'SELECT * FROM eshop.orders_by_client_date WHERE client_id = ? AND order_date = ?';
    try {
        const orders = await execute(query, [clientId, orderDate]);
        return orders; // Assuming this returns an array of order objects
    } catch (error) {
        console.error('Error retrieving client orders:', error);
        return 'Failed to retrieve client orders';
    }
}

module.exports = { addClient, listProducts, addOrder, getOrdersByClient, addProductReview, getProductReviews, getClientOrders };
