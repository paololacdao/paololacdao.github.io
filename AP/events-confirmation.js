var dataLayer = window.dataLayer || [];

// Data layer push: GA Ecommerce purchase
dataLayer.push({
    'event': 'purchase',
    ecommerce: {
        'currency': 'SGD',
        'value': 649.00,
        'tax': 42.46,
        'shipping': 0,
        'affiliation': 'Apple Store',
        'transaction_id': 'ID001',
        'coupon': '',
        'items': [{
          'item_name': 'Apple Watch Series 7',
          'item_id': 'APWATCHS7',
          'price': '649.00',
          'item_brand': 'Apple',
          'item_category': 'Apparel',
          'item_category2': 'Watch',
          'item_variant': 'Black',
          'quantity': '1'
        }]
    }
});

// Event handler: Click on link to homepage
document.getElementById('link_homepage').addEventListener('click', function(){
    dataLayer.push({
        'event': 'gaevent',
        'eventCategory': 'interactions',
        'eventAction': 'click',
        'eventLabel': 'link_homepage'
    })
});