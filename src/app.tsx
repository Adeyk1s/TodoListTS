import React, { useEffect, useState } from 'react';
import Logo from './components/Logo';
import FormHandle from './components/FormHandle';
import PackingList from './components/PackingList';
import Stats from './components/Stats';

interface initialItemsI {
    id: number;
    description: string;
    quantity: number;
    packed: boolean;
}

const initialItems = [
    { id: 1, description: 'Passports', quantity: 2, packed: false },
    { id: 2, description: 'Socks', quantity: 12, packed: false },
    { id: 3, description: 'Donk', quantity: 4, packed: true },
];

function App() {
    const [itemStore, setItemStore] = useState(function (): Array<initialItemsI> {
        const storageValue = localStorage.getItem('All');
        return storageValue ? JSON.parse(storageValue) : initialItems;
    });

    const [items, setItem] = useState(itemStore.length == 0 ? initialItems : itemStore);
    
    useEffect(
        function () {
            localStorage.setItem('All', JSON.stringify(items));
        },
        [items, 'All']
    );
    
    function handleAddItem(item: initialItemsI) {
        setItem((items: Array<initialItemsI>) => [...items, item]);
        setItemStore((items: Array<initialItemsI>) => [...items, item]);
    }
    function handleDelteItem(id: number) {
        setItem((items: Array<initialItemsI>) => items.filter(item => item.id !== id));
        setItemStore((items: Array<initialItemsI>) => items.filter(item => localStorage.removeItem('All')));
    }
    function handleToggleItem(id: number) {
        setItem((items: Array<initialItemsI>) =>
            items.map(item => (item.id === id ? { ...item, packed: !item.packed } : item))
        );
    }
    function handleClearItem() {
        const confirned = window.confirm('Are you sure you want to delete all items?');
        if (confirned) setItem([]);
    }

    return (
        <>
            <Logo />
            <FormHandle handleAddItem={handleAddItem} />
            <PackingList
                items={items}
                onDeleteItem={handleDelteItem}
                onToggleItems={handleToggleItem}
                onClearList={handleClearItem}
            />
            <Stats items={items} />
        </>
    );
}

export default App;
