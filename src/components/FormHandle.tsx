import React, { useState } from 'react';

interface initialItemsI {
    id: number;
    description: string;
    quantity: number;
    packed: boolean;
}

interface FormHandleI {
    handleAddItem: (newItem: initialItemsI) => void;
}

function FormHandle({ handleAddItem }: FormHandleI) {
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState(1);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        if (!description) return;
        const newItem = { description, quantity, packed: false, id: Date.now() };
        handleAddItem(newItem);
        setDescription('');
        setQuantity(1);
    }

    return (
        <form className='add-form' onSubmit={handleSubmit}>
            <h3>What do you need for you trip?</h3>
            <select value={quantity} onChange={e => setQuantity(Number(e.target.value))}>
                {Array.from({ length: 20 }, (_, i) => i + 1).map(num => (
                    <option value={num} key={num}>
                        {num}
                    </option>
                ))}
            </select>
            <input
                type='text'
                placeholder='Item...'
                value={description}
                onChange={e => setDescription(e.target.value)}
            />
            <button>Add</button>
        </form>
    );
}

export default FormHandle;
