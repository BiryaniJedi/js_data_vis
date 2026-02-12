class Chart {
    constructor(data, width = 400, height = 300) {
        if (!Array.isArray(data)) {
            throw new Error('Data must be an array');
        }
        if (data.length === 0) {
            throw new Error('Data cannot be empty');
        }

        if (width <= 0 || height <= 0) {
            throw new Error('Width and height must be positive');
        }

        this.data = data;
        this.width = width;
        this.height = height;
        this.title = '';
        this.colors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6'];
        this.margins = { top: 0, right: 0, bottom: 0, left: 0 };
    }

    get drawingWidth() {
        return this.width - this.margins.left - this.margins.right;
    }

    get drawingHeight() {
        return this.height - this.margins.top - this.margins.bottom;
    }

    setTitle(title) {
        this.title = title;
        return this;
    }

    setColors(colors) {
        if (!Array.isArray(colors) || colors.length === 0) {
            throw new Error('Colors must be a non-empty array');
        }
        this.colors = colors;
        return this;
    }

    setMargins(top, right, bottom, left) {
        this.margins = { top, right, bottom, left };
        return this;
    }

    getData() {
        return this.data;
    }

    setData(data) {
        if (!Array.isArray(data) || data.length === 0) {
            throw new Error('Data must be a non-empty array');
        }
        this.data = data;
        return this;
    }

    getColor(index) {
        return this.colors[index % this.colors.length];
    }

    render() {
        throw new Error('render() must be implemented by subclass');
    }

    static validateNumericData(data) {
        return !data.some(val => typeof val !== 'number' || isNaN(val));
    }
}

export default Chart;
