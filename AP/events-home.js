var dataLayer = window.dataLayer || [];

// Event handler: Click on "Product Click" button
document.getElementById('btn-event-productClick').addEventListener('click', function(){
    dataLayer.push({ ecommerce: null });  // Clear the previous ecommerce object.
    dataLayer.push({
        event: "view_item",
        ecommerce: {
            items: [{
                item_id: "SKU_12345",
                item_name: "Stan and Friends Tee",
                affiliation: "Google Merchandise Store",
                coupon: "SUMMER_FUN",
                currency: "USD",
                discount: 2.22,
                index: 0,
                item_brand: "Google",
                item_category: "Apparel",
                item_category2: "Adult",
                item_category3: "Shirts",
                item_category4: "Crew",
                item_category5: "Short sleeve",
                item_list_id: "related_products",
                item_list_name: "Related Products",
                item_variant: "green",
                location_id: "L_12345",
                price: 9.99,
                quantity: 1
            }]
        }
    });
});

// Event handler: Click on "Add to Cart" button
document.getElementById('btn-event-addToCart').addEventListener('click', function(){
    dataLayer.push({ ecommerce: null });  // Clear the previous ecommerce object.
    dataLayer.push({
        event: "add_to_cart",
        ecommerce: {
            items: [{
                item_id: "SKU_12345",
                item_name: "Stan and Friends Tee",
                affiliation: "Google Merchandise Store",
                coupon: "SUMMER_FUN",
                currency: "USD",
                discount: 2.22,
                index: 0,
                item_brand: "Google",
                item_category: "Apparel",
                item_category2: "Adult",
                item_category3: "Shirts",
                item_category4: "Crew",
                item_category5: "Short sleeve",
                item_list_id: "related_products",
                item_list_name: "Related Products",
                item_variant: "green",
                location_id: "L_12345",
                price: 9.99,
                quantity: 1
            }]
        }
    });
});

// Event handler: Click on Custom Event button
document.getElementById('btn-event-customEvent').addEventListener('click', function(){
    dataLayer.push({
        'event': 'custom_event',
        'parameter1': 'some value'
    })
});
