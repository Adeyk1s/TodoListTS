import React from 'react';

interface initialItemsI {
    id: number;
    description: string;
    quantity: number;
    packed: boolean;
}

interface ItemI {
    item: initialItemsI;
    onDeleteItem: (id: number) => void;
    onToggleItems: (id: number) => void;
}

function Item({ item, onDeleteItem, onToggleItems }: ItemI) {
    return (
        <li>
            <input
                type='checkbox'
                value={`${item.packed}`}
                onChange={() => onToggleItems(item.id)}
                checked={item.packed ? true : false}
            />
            <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
                {item.quantity} {item.description}
                <button onClick={() => onDeleteItem(item.id)}>❌</button>
            </span>
        </li>
    );
}

export default Item;
