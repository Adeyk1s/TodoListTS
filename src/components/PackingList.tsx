import React, { useState } from 'react';
import Item from './Item';

interface initialItemsI {
    id: number;
    description: string;
    quantity: number;
    packed: boolean;
}

interface PackingListI {
    items: Array<initialItemsI>;
    onDeleteItem: (id: number) => void;
    onToggleItems: (id: number) => void;
    onClearList: () => void;
}

let sortedItems: Array<initialItemsI>;

function PackingList({ items, onDeleteItem, onToggleItems, onClearList }: PackingListI) {
    const [sortBy, setSortBy] = useState('Show All Tasks');

    if (sortBy === 'Show All Tasks') {
        sortedItems = items;
    }
    if (sortBy === 'Show Active Tasks') {
        sortedItems = items.slice().filter(item => item.packed !== true);
    }
    if (sortBy === 'Show completed Tasks') {
        sortedItems = items.slice().filter(item => item.packed !== false);
    }
    return (
        <div className='list'>
            <ul>
                {sortedItems.map(item => (
                    <Item item={item} key={item.id} onDeleteItem={onDeleteItem} onToggleItems={onToggleItems} />
                ))}
            </ul>
            <div className='actions'>
                <select
                    value={sortBy}
                    onChange={e => {
                        setSortBy(e.target.value);
                    }}
                >
                    <option value='Show All Tasks'>Show All Tasks</option>
                    <option value='Show Active Tasks'>Show Active Tasks</option>
                    <option value='Show completed Tasks'>Show completed Tasks</option>
                </select>
                <button onClick={onClearList}>Clear list</button>
            </div>
        </div>
    );
}

export default PackingList;
