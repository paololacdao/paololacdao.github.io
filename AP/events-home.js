var dataLayer = window.dataLayer || [];

// Event handler: Click on link to homepage
document.getElementById('link_homepage').addEventListener('click', function(){
    dataLayer.push({
        'event': 'gaevent',
        'eventCategory': 'interactions',
        'eventAction': 'click',
        'eventLabel': 'link_homepage'
    })
});

// Event handler: Click on CTA
document.getElementById('cta').addEventListener('click', function(){
    dataLayer.push({
        'event': 'gaevent',
        'eventCategory': 'interactions',
        'eventAction': 'click',
        'eventLabel': 'cta'
    })
});

// Event handler: Click on link to confirmation page
document.getElementById('link_confirmation_page').addEventListener('click', function(){
    dataLayer.push({
        'event': 'gaevent',
        'eventCategory': 'interactions',
        'eventAction': 'click',
        'eventLabel': 'link_confirmation_page'
    })
});