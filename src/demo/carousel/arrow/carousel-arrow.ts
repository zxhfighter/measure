import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'demo-carousel-arrow',
    templateUrl: './carousel-arrow.html',
    styleUrls: ['./carousel-arrow.less'],
    encapsulation: ViewEncapsulation.None
})
export class CarouselArrowDemo {

    datasource = [
        {
            title: 'apple',
            imageUrl: 'https://images.unsplash.com/reserve/bIdO4DDS4qwVF6pHN4qr__MG_1605.jpg?dpr=2' +
                '&auto=format&fit=crop&w=568&h=379&q=60&cs=tinysrgb&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D'
        },
        {
            title: 'people',
            imageUrl: 'https://images.unsplash.com/photo-1500440853933-3796d0182c96?dpr=2&auto=format' +
                '&fit=crop&w=568&h=426&q=60&cs=tinysrgb&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D'
        },
        {
            title: 'star',
            imageUrl: 'https://images.unsplash.com/photo-1488485300416-de7f8f876d4b?dpr=2&auto=format' +
                '&fit=crop&w=568&h=379&q=60&cs=tinysrgb&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D'
        }
    ];

}
