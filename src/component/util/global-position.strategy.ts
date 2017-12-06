
export class GlobalPositionStrategy {

    private _cssPosition: string = 'static';
    private _topOffset: string = '';
    private _bottomOffset: string = '';
    private _leftOffset: string = '';
    private _rightOffset: string = '';
    private _alignItems: string = '';
    private _justifyContent: string = '';
    private _width: string = '';
    private _height: string = '';

    /**
     * Sets the top position of the overlay. Clears any previously set vertical position.
     * @param value New top offset.
     */
    top(value: string = ''): this {
        this._bottomOffset = '';
        this._topOffset = value;
        this._alignItems = 'flex-start';
        return this;
    }

    /**
     * Sets the left position of the overlay. Clears any previously set horizontal position.
     * @param value New left offset.
     */
    left(value: string = ''): this {
        this._rightOffset = '';
        this._leftOffset = value;
        this._justifyContent = 'flex-start';
        return this;
    }

    /**
     * Sets the bottom position of the overlay. Clears any previously set vertical position.
     * @param value New bottom offset.
     */
    bottom(value: string = ''): this {
        this._topOffset = '';
        this._bottomOffset = value;
        this._alignItems = 'flex-end';
        return this;
    }

    /**
     * Sets the right position of the overlay. Clears any previously set horizontal position.
     * @param value New right offset.
     */
    right(value: string = ''): this {
        this._leftOffset = '';
        this._rightOffset = value;
        this._justifyContent = 'flex-end';
        return this;
    }

    /**
     * Sets the overlay width and clears any previously set width.
     * @param value New width for the overlay
     */
    width(value: string = ''): this {
        this._width = value;

        // When the width is 100%, we should reset the `left` and the offset,
        // in order to ensure that the element is flush against the viewport edge.
        if (value === '100%') {
            this.left('0px');
        }

        return this;
    }

    /**
     * Sets the overlay height and clears any previously set height.
     * @param value New height for the overlay
     */
    height(value: string = ''): this {
        this._height = value;

        // When the height is 100%, we should reset the `top` and the offset,
        // in order to ensure that the element is flush against the viewport edge.
        if (value === '100%') {
            this.top('0px');
        }

        return this;
    }

    /**
     * Centers the overlay horizontally with an optional offset.
     * Clears any previously set horizontal position.
     *
     * @param offset Overlay offset from the horizontal center.
     */
    centerHorizontally(offset: string = ''): this {
        this.left(offset);
        this._justifyContent = 'center';
        return this;
    }

    /**
     * Centers the overlay vertically with an optional offset.
     * Clears any previously set vertical position.
     *
     * @param offset Overlay offset from the vertical center.
     */
    centerVertically(offset: string = ''): this {
        this.top(offset);
        this._alignItems = 'center';
        return this;
    }
}
