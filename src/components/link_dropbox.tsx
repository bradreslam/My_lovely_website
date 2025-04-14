class Dropdown {
    private options: string[];

    constructor(options: string[]) {
        this.options = options;
    }

    render(): void {
        const dropdownElement = document.createElement('select');

        this.options.forEach((option) => {
            const optionElement = document.createElement('option');
            optionElement.text = option;
            dropdownElement.add(optionElement);
        });

        document.body.appendChild(dropdownElement);
    }
}

// Example usage
const dropdownOptions = ['Option 1', 'Option 2', 'Option 3'];
const dropdown = new Dropdown(dropdownOptions);
dropdown.render();