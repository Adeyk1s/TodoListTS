import React from 'react';
interface initialItemsI {
    id: number;
    description: string;
    quantity: number;
    packed: boolean;
}
interface StatsI {
    items: Array<initialItemsI>;
}

function Stats({ items }: StatsI) {
    if (!items.length) {
        return (
            <p className='stats'>
                <em>Start adding items to your packed list</em>
            </p>
        );
    }
    const numItems = items.length;
    const numPacked = items.filter((item: initialItemsI) => item.packed).length;
    const percentItem = Math.round((numPacked / numItems) * 100);

    return (
        <footer className='stats'>
            <em>
                {percentItem === 100
                    ? 'You already going to see'
                    : `You have ${numItems} item on your list, and you already packed
          ${numPacked} (${percentItem}%)`}
            </em>
        </footer>
    );
}

export default Stats;
